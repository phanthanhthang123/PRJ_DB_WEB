
const db = require('../../config/db');

class HomeController{
    async gethome(req,res){
        await db.query('select * from "SanPhamBan" ', (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                req.session.product = result.rows;
                // console.log(req.session); // Kiểm tra xem bên trong req.session có gì
                if (req.session && req.session.user) {
                    res.render('home', {
                        user: req.session.user,
                        data: result.rows
                    });
                } else {
                    res.render('home', {
                        data: result.rows
                    });
                }
            }
        });
    }
}

module.exports = new HomeController;