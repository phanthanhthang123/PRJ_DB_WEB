const db = require('../../config/db');

class CartController {
    async addToCart(req, res) {
        const { productId } = req.body;
        const productIdInt = parseInt(productId, 10);
        if (isNaN(productIdInt)) {
            return res.status(400).send({ success: false, message: 'ID sản phẩm không hợp lệ' });
        }

        const KhachHang = req.session.user;
        if (!KhachHang || !KhachHang.ID) {
            return res.status(401).send({ success: false, message: 'Người dùng chưa được xác thực' });
        }
        const KhachHangID = KhachHang.ID;

        try {
            const query = `
            INSERT INTO "GioHang"("KhachHangID","SanPhamID") VALUES ($1, $2);
            `
            await db.query(query, [KhachHangID, productIdInt]);
            res.send({ success: true, message: 'Sản phẩm đã được thêm vào giỏ hàng' });
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            res.status(500).send({ success: false, message: 'Lỗi khi thêm vào giỏ hàng' });
        }
    }
}

module.exports = new CartController;