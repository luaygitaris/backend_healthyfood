const fn = require('../../common/fn');

// Model Hero dengan struktur dan flow mirip zakatModel.js
exports.addHero = async (dt) => {
  dt.flow.push('✅ heroModel.js | start addHero');
  try {
    const { image, judul, keterangan } = dt.req.body;
    // Validasi minimal
    dt.flow.push('✅ heroModel.js | image: ' + image);
    dt.flow.push('✅ heroModel.js | judul: ' + judul);
    dt.flow.push('✅ heroModel.js | keterangan: ' + keterangan);
    if (!image || !judul || !keterangan) {
      dt.flow.push('❌ heroModel.js | Data tidak lengkap');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `INSERT INTO Hero (image, judul, keterangan) VALUES (?, ?, ?)`;
    dt.flow.push('✅ heroModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [image, judul, keterangan]);
    if (!result.insertId) {
      dt.flow.push('❌ heroModel.js | Gagal insert data Hero');
      dt.code = 500;
      dt.err = true;
      return dt;
    }
    dt.data = { id: result.insertId };
    dt.flow.push('✅ heroModel.js | Data hero berhasil ditambahkan');
    dt.code = 201;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ heroModel.js | Error addHero: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.getAllHero = async (dt) => {
  dt.flow.push('✅ heroModel.js | start getAllHero');
  try {
    const query = `SELECT * FROM Hero ORDER BY id DESC`;
    dt.flow.push('✅ heroModel.js | SQL : ' + query);
    const [rows] = await fn.db.query(query);
    dt.data = rows;
    dt.code = 200;
    dt.err = false;
    dt.flow.push('✅ heroModel.js | Berhasil ambil data hero');
    return dt;
  } catch (error) {
    dt.flow.push('❌ heroModel.js | Error getAllHero: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.getHeroById = async (dt) => {
  dt.flow.push('✅ heroModel.js | start getHeroById');
  try {
    const { id } = dt.req.params;
    if (!id) {
      dt.flow.push('❌ heroModel.js | ID tidak ditemukan');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `SELECT * FROM Hero WHERE id = ?`;
    dt.flow.push('✅ heroModel.js | SQL : ' + query);
    const [rows] = await fn.db.query(query, [id]);
    dt.data = rows[0] || null;
    dt.code = 200;
    dt.err = false;
    dt.flow.push('✅ heroModel.js | Berhasil ambil data hero by id');
    return dt;
  } catch (error) {
    dt.flow.push('❌ heroModel.js | Error getHeroById: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.updateHero = async (dt) => {
  dt.flow.push('✅ heroModel.js | start updateHero');
  try {
    const { id } = dt.req.params;
    const { image, judul, keterangan } = dt.req.body;
    if (!id || !image || !judul || !keterangan) {
      dt.flow.push('❌ heroModel.js | Data tidak lengkap untuk update');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `UPDATE Hero SET image = ?, judul = ?, keterangan = ? WHERE id = ?`;
    dt.flow.push('✅ heroModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [image, judul, keterangan, id]);
    if (result.affectedRows === 0) {
      dt.flow.push('❌ heroModel.js | Data hero tidak ditemukan untuk update');
      dt.code = 404;
      dt.err = true;
      return dt;
    }
    dt.data = { id };
    dt.flow.push('✅ heroModel.js | Data hero berhasil diupdate');
    dt.code = 200;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ heroModel.js | Error updateHero: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.deleteHero = async (dt) => {
  dt.flow.push('✅ heroModel.js | start deleteHero');
  try {
    const { id } = dt.req.params;
    if (!id) {
      dt.flow.push('❌ heroModel.js | ID tidak ditemukan untuk delete');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `DELETE FROM Hero WHERE id = ?`;
    dt.flow.push('✅ heroModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [id]);
    if (result.affectedRows === 0) {
      dt.flow.push('❌ heroModel.js | Data hero tidak ditemukan untuk delete');
      dt.code = 404;
      dt.err = true;
      return dt;
    }
    dt.data = { id };
    dt.flow.push('✅ heroModel.js | Data hero berhasil dihapus');
    dt.code = 200;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ heroModel.js | Error deleteHero: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};
