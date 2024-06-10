
const db = require('../../config/db');

class UserController {
    //[get]
    getuser(req, res) {
        res.render('user', {
            user: req.session.user,
            message: req.session.message
        });
        // Xóa thông báo sau khi đã hiển thị để không hiển thị lại lần nữa
        if (req.session.message) {
            delete req.session.message;
        }
    }

    //post /user
    async postuser(req, res) {
        const { hovaten, email, gioitinh, sodienthoai, sinhnhat, diachi } = req.body;
        const user = req.session.user;
        let updates = [];
        let updateFields = {}; // Để lưu trữ các trường được cập nhật

        if (hovaten) {
            updates.push(`"TenND" = '${hovaten}'`);
            updateFields.TenND = hovaten;
        }
        if (email) {
            updates.push(`"TaiKhoan" = '${email}'`);
            updateFields.TaiKhoan = email;
        }
        if (gioitinh) {
            updates.push(`"GioiTinh" = '${gioitinh}'`);
            updateFields.GioiTinh = gioitinh;
        }
        if (sodienthoai) {
            updates.push(`"SoDienThoai" = '${sodienthoai}'`);
            updateFields.SoDienThoai = sodienthoai;
        }
        if (sinhnhat) {
            updates.push(`"SinhNhat" = '${sinhnhat}'`);
            updateFields.SinhNhat = sinhnhat;
        }
        if (diachi) {
            updates.push(`"DiaChi" = '${diachi}'`);
            updateFields.DiaChi = diachi;
        }
        if (updates.length > 0) {
            const query = `UPDATE "NguoiDung" SET ${updates.join(', ')} WHERE "NguoiDung"."ID" = ${user.ID};`;
            try {
                await db.query(query); // Sử dụng truy vấn đã được tạo
                // Cập nhật session user
                Object.assign(req.session.user, updateFields);
                req.session.message = 'Cập nhật thông tin thành công';
            } catch (error) {
                console.error('Error updating user:', error);
                req.session.message = 'Cập nhật thông tin thất bại';
            }
            res.redirect('/user');
        } else {
            req.session.message = 'Không có thông tin nào để cập nhật';
            res.redirect('/user');
        }
    }
    //get /user/:slug
    error(req, res) {
        res.render('ERROR');
    }
}

module.exports = new UserController;

