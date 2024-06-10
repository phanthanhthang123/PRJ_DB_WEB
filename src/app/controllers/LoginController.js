const db = require('../../config/db');
const getUserByEmail = require('../function/GetUserByEmail');

class LoginController {
    //[Get] /login
    getlogin(req, res) {
        res.render('login');
    }
    //[post]
    async postlogin(req, res) {
        const { email, password } = req.body;
        // console.log(email, password); // Xem dữ liệu gửi lên từ form

        if (!email || !password) {
            // Kiểm tra nếu email hoặc mật khẩu không được cung cấp
            return res.status(400).render('login', { message: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
        }
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                // Nếu không tìm thấy người dùng
                return res.status(401).render('login', { message: 'Tài khoản không tồn tại!' });
            }

            if (password != user.MatKhau) {
                // Nếu mật khẩu không khớp

                return res.status(401).render('login', { message: 'Mật khẩu không chính xác!' });
            }
            // Nếu mọi thứ ổn, chuyển hướng người dùng tới trang chủ
            else {
                req.session.user = user;  // Lưu thông tin người dùng vào session
                console.log(req.session.user);
                return res.redirect('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).render('login', { message: 'Lỗi server khi đăng nhập!' });
        }
    }
    //[GET] /login/:slug
    error(req, res) {
        res.send('ERROR');
    }

}

module.exports = new LoginController;