const db = require('../../config/db');

class SearchController {
    //[Get] /search
    search(req, res) {
        const searchQuery = req.query.q;
        const queryText = 'SELECT * FROM "SanPham" WHERE "SanPham"."TenSP" ILIKE $1'
        const values = [`%${searchQuery}%`];
        db.query(queryText, values, (err, queryRes) => {
            if (err) {
                console.error(err);
                res.status(500).send('Lỗi kết nối tới Server');
            } else {
                console.log(req.session.user);
                if (req.session && req.session.user) {
                    res.render('search', {
                        user: req.session.user,
                        data: queryRes.rows,
                        value: searchQuery
                    });
                } else {
                    res.render('search', {
                        data: queryRes.rows,
                        value: searchQuery
                    });
                }
            }
        });
    }
    //[GET] /search/:slug
    error(req, res) {
        res.send('ERROR');
    }
}

// gia tri khi require tra ve controller (xuat ra ngoai)
module.exports = new SearchController;