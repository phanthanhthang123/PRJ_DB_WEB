const { Pool } = require('pg');

// Thông số kết nối cơ sở dữ liệu
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'product',
  password: 'thang01010610',
  port: 5432, // cổng mặc định của PostgreSQL
});

class DuLieu {
  constructor() {
    this.database = [];
  }

  async layDuLieu() {
    try {
      const result = await pool.query('SELECT * FROM products');
      this.database = result.rows;
      // Đóng kết nối khi đã lấy xong dữ liệu
      await pool.end();
      return this.database;
    } catch (err) {
      console.error('Lỗi khi thực hiện truy vấn', err.stack);
      throw err;
    }
  }
}

const duLieuInstance = new DuLieu();

module.exports = duLieuInstance;
