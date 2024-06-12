const db = require('../../config/db');

class HomeController {
    async gethome(req, res) {
        try {
            const resultSale = await db.query('SELECT * FROM "SanPhamSale"');
            req.session.productsale = resultSale.rows;

            const resultBan = await db.query('SELECT * FROM "SanPhamBan"');
            req.session.product = resultBan.rows;

            if (req.session && req.session.user) {
                if (req.session.productsale && req.session.productsale.length > 0) {
                    res.render('home', {
                        user: req.session.user,
                        data: resultBan.rows,
                        productsale: resultSale.rows
                    });
                } else {
                    res.render('home', {
                        user: req.session.user,
                        data: resultBan.rows,
                        message: 'Không có sản phẩm nào được giảm giá'
                    });
                }
            } else {
                res.render('home', {
                    data: resultBan.rows,
                    productsale: resultSale.rows
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new HomeController;