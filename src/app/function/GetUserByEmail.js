const db = require('../../config/db');

async function getUserByEmail(email) {
    const query = 'SELECT * FROM "KhachHang" kh WHERE kh."Email" = $1';
    try {
        const result = await db.query(query, [email]);
        if (result.rows.length > 0) {
            return result.rows[0]; // Trả về người dùng đầu tiên tìm thấy
        } else {
            return null; // Không tìm thấy người dùng
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw error; // Ném lỗi để xử lý bên ngoài
    }
}

module.exports = getUserByEmail;