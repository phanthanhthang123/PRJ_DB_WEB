const db = require('../../config/db');

class registercontroller {
    //[GET] /register
    getregister(req, res) {
        res.render('register');
    }
    //[POST] /register
    async postregister(req, res) {
        const { fullname, email, password, password_confirmation } = req.body;

        if (fullname && email && password && password_confirmation) {
            // console.log(fullname, email, password, password_confirmation);
            try {
                // Kiểm tra xem email đã tồn tại trong DB chưa
                const emailCheckQuery = 'SELECT * FROM "NguoiDung" WHERE "TaiKhoan" = $1';
                const emailCheckResult = await db.query(emailCheckQuery, [email]);
                if (emailCheckResult.rows.length > 0) {
                    return res.status(400).render('register', { message: 'Tài khoản email đã tồn tại' });
                }
                else {
                    // Nếu email chưa tồn tại, tiến hành insert
                    const queryText = `
                    insert into "NguoiDung"("TenND","TaiKhoan","MatKhau")
                    values ($1,$2,$3);
                    `;
                    await db.query(queryText, [fullname, email, password]);
                    // console.log('User registered successfully');
                    return res.render('register', { message: 'Đăng kí tài khoản thành công,hãy đăng nhập để mua sắm' });
                }
            } catch (err) {
                console.error('Database error', err);
                return res.status(400).render('register', { message: 'Lỗi kết nối tới server' });
            }

        }
    }
    //[GET] /register/:slug
    error(req, res) {
        res.send('ERROR');
    }
}

module.exports = new registercontroller;