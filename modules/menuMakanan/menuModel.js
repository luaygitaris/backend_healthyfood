const fn = require('../../common/fn');

exports.addMenu = async (dt) => {
  dt.flow.push('✅ menuModel.js | start addMenu');
  try {
    const { gambar_url, nama, bahan, keterangan, harga } = dt.req.body;
    dt.flow.push('✅ menuModel.js | gambar_url: ' + gambar_url);
    dt.flow.push('✅ menuModel.js | nama: ' + nama);
    dt.flow.push('✅ menuModel.js | bahan: ' + bahan);
    dt.flow.push('✅ menuModel.js | keterangan: ' + keterangan);
    dt.flow.push('✅ menuModel.js | harga: ' + harga);
    if (!gambar_url || !nama || !bahan || harga == null) {
      dt.flow.push('❌ menuModel.js | Data tidak lengkap');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `INSERT INTO menu_makanan (gambar_url, nama, bahan, keterangan, harga) VALUES (?, ?, ?, ?, ?)`;
    dt.flow.push('✅ menuModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [gambar_url, nama, bahan, keterangan, harga]);
    if (!result.insertId) {
      dt.flow.push('❌ menuModel.js | Gagal insert data menu');
      dt.code = 500;
      dt.err = true;
      return dt;
    }
    dt.data = { id: result.insertId };
    dt.flow.push('✅ menuModel.js | Data menu berhasil ditambahkan');
    dt.code = 201;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ menuModel.js | Error addMenu: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.getAllMenu = async (dt) => {
  dt.flow.push('✅ menuModel.js | start getAllMenu');
  try {
    const query = `SELECT * FROM menu_makanan ORDER BY id DESC`;
    dt.flow.push('✅ menuModel.js | SQL : ' + query);
    const [rows] = await fn.db.query(query);
    dt.data = rows;
    dt.code = 200;
    dt.err = false;
    dt.flow.push('✅ menuModel.js | Berhasil ambil data menu');
    return dt;
  } catch (error) {
    dt.flow.push('❌ menuModel.js | Error getAllMenu: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.getMenuById = async (dt) => {
  dt.flow.push('✅ menuModel.js | start getMenuById');
  try {
    const { id } = dt.req.params;
    if (!id) {
      dt.flow.push('❌ menuModel.js | ID tidak ditemukan');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `SELECT * FROM menu_makanan WHERE id = ?`;
    dt.flow.push('✅ menuModel.js | SQL : ' + query);
    const [rows] = await fn.db.query(query, [id]);
    dt.data = rows[0] || null;
    dt.code = 200;
    dt.err = false;
    dt.flow.push('✅ menuModel.js | Berhasil ambil data menu by id');
    return dt;
  } catch (error) {
    dt.flow.push('❌ menuModel.js | Error getMenuById: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.updateMenu = async (dt) => {
  dt.flow.push('✅ menuModel.js | start updateMenu');
  try {
    const { id } = dt.req.params;
    const { gambar_url, nama, bahan, keterangan, harga } = dt.req.body;
    if (!id || !gambar_url || !nama || !bahan || harga == null) {
      dt.flow.push('❌ menuModel.js | Data tidak lengkap untuk update');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `UPDATE menu_makanan SET gambar_url = ?, nama = ?, bahan = ?, keterangan = ?, harga = ? WHERE id = ?`;
    dt.flow.push('✅ menuModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [gambar_url, nama, bahan, keterangan, harga, id]);
    if (result.affectedRows === 0) {
      dt.flow.push('❌ menuModel.js | Data menu tidak ditemukan untuk update');
      dt.code = 404;
      dt.err = true;
      return dt;
    }
    dt.data = { id };
    dt.flow.push('✅ menuModel.js | Data menu berhasil diupdate');
    dt.code = 200;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ menuModel.js | Error updateMenu: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};

exports.deleteMenu = async (dt) => {
  dt.flow.push('✅ menuModel.js | start deleteMenu');
  try {
    const { id } = dt.req.params;
    if (!id) {
      dt.flow.push('❌ menuModel.js | ID tidak ditemukan untuk delete');
      dt.code = 400;
      dt.err = true;
      return dt;
    }
    const query = `DELETE FROM menu_makanan WHERE id = ?`;
    dt.flow.push('✅ menuModel.js | SQL : ' + query);
    const [result] = await fn.db.query(query, [id]);
    if (result.affectedRows === 0) {
      dt.flow.push('❌ menuModel.js | Data menu tidak ditemukan untuk delete');
      dt.code = 404;
      dt.err = true;
      return dt;
    }
    dt.data = { id };
    dt.flow.push('✅ menuModel.js | Data menu berhasil dihapus');
    dt.code = 200;
    dt.err = false;
    return dt;
  } catch (error) {
    dt.flow.push('❌ menuModel.js | Error deleteMenu: ' + error);
    dt.code = 500;
    dt.err = true;
    return dt;
  }
};
