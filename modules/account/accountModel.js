const fn = require('../../common/fn');
const WordPressHash = require('wordpress-hash-node');

exports.login = async (dt) => {
    let email='';
    let password='';
    let user={};
    try {  
        email=dt.req_body.email;
        password=dt.req_body.password;

        if (!email || !password) {
            dt.flow.push('❌ accountModel.js | email or password required'+error);
            dt.code=400;
            dt.err=true; 
            return dt;
        }

        // Query database - hanya ambil field yang diperlukan
        const query = `
            SELECT ID, user_login, user_pass, user_email, display_name
            FROM wp_users 
            WHERE user_email = '${email}'
            LIMIT 1
        `;

        const [rows] = await fn.db.query(query, [email]);
        user = rows[0];

    } catch (error) {
        dt.flow.push('❌ accountModel.js | Error querying database'+error);
        dt.code=500;
        dt.err=true; 
        return dt;
    }

    if (!user) {
        dt.flow.push('❌ accountModel.js | User not found ');
        dt.code=404;
        dt.err=true; 
        return dt;
    }

    // Verifikasi password menggunakan WordPress hash
    const isMatch = WordPressHash.CheckPassword(password, user.user_pass);
    if (!isMatch) {
        dt.flow.push('❌ accountModel.js | Invalid password');
        dt.code=401;
        dt.err=true; 
        return dt;
    }
    // Generate token
    const token = fn.generateToken(dt.req, user.ID);
    if (!token) {
        dt.flow.push('❌ accountModel.js | Failed generate token');
        dt.code=500;
        dt.err=true; 
        return dt;
    }

    dt.data={
        token:token,
        user:user
    };
    dt.flow.push('✅ accountModel.js | login success');
    dt.code=200;
    dt.err=false;

    // Return data yang diperlukan saja
    return dt;
    
};

exports.register = async (dt) => {
    let email = '';
    let password = '';
    let display_name = '';
    try {
        email = dt.req_body.email;
        password = dt.req_body.password;
        display_name = dt.req_body.display_name || '';

        if (!email || !password) {
            dt.flow.push('❌ accountModel.js | email or password required');
            dt.code = 400;
            dt.err = true;
            return dt;
        }

        // Cek apakah user sudah ada
        const checkQuery = `SELECT ID FROM wp_users WHERE user_email = ? LIMIT 1`;
        const [rows] = await fn.db.query(checkQuery, [email]);
        if (rows.length > 0) {
            dt.flow.push('❌ accountModel.js | Email already registered');
            dt.code = 409;
            dt.err = true;
            return dt;
        }

        // Hash password menggunakan WordPressHash
        const hashedPassword = WordPressHash.HashPassword(password);

        // Insert user baru
        const insertQuery = `
            INSERT INTO wp_users (user_login, user_pass, user_email, display_name, user_registered) 
            VALUES (?, ?, ?, ?, NOW())
        `;
        const user_login = email.split('@')[0];
        const [result] = await fn.db.query(insertQuery, [user_login, hashedPassword, email, display_name]);

        if (!result.insertId) {
            dt.flow.push('❌ accountModel.js | Failed to register user');
            dt.code = 500;
            dt.err = true;
            return dt;
        }

        const userId = result.insertId;

        // ✅ Insert default role ke usermeta
        await fn.db.query(
            `INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES (?, 'role', 'user')`,
            [userId]
        );

        // Generate token
        const token = fn.generateToken(dt.req, userId);
        if (!token) {
            dt.flow.push('❌ accountModel.js | Failed generate token');
            dt.code = 500;
            dt.err = true;
            return dt;
        }

        dt.data = {
            token: token,
            user: {
                ID: userId,
                user_login,
                user_email: email,
                display_name
            }
        };
        dt.flow.push('✅ accountModel.js | register success');
        dt.code = 201;
        dt.err = false;
        return dt;
    } catch (error) {
        dt.flow.push('❌ accountModel.js | Error register: ' + error);
        dt.code = 500;
        dt.err = true;
        return dt;
    }
};
