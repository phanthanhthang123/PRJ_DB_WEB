
const db = require('../../config/db');

class UserController {
    //[get]
    async getuser(req, res) {
        var KhachHang = req.session.user;
        var KhachHangID = null;
        if(KhachHang){
            KhachHangID =KhachHang.ID;
        }
        const query = `
            SELECT sp."ID" as "SanPhamID", gh."KhachHangID", sp."TenSP", sp."GiaGoc",
            ROUND(sp."GiaGoc" * (1 - sp."GiaSale" / 100), 2) AS "GiaBan",gh."SoLuong",
            sp."MoTaSP", sp."Anh"
            FROM "GioHang" gh
            JOIN "KhachHang" kh ON (gh."KhachHangID" = kh."ID")
            JOIN "SanPham" sp ON (sp."ID" = gh."SanPhamID")
            WHERE kh."ID" = $1;
        `;
        if(KhachHangID){
            const { rows } = await db.query(query, [KhachHangID]);
            if(rows){
                req.session.CartItems = rows;
            }
        }

        res.render('user', {
            Items : req.session.CartItems,
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
        console.log(hovaten, email, gioitinh, sodienthoai, sinhnhat, diachi);
        const user = req.session.user;

        console.log(user);
        let updates = [];
        let updateFields = {}; // Để lưu trữ các trường được cập nhật

        if (hovaten) {
            updates.push(`"TenKH" = '${hovaten}'`);
            updateFields.TenKH = hovaten;
        }
        if (email) {
            updates.push(`"Email" = '${email}'`);
            updateFields.Email = email;
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
            const query = `UPDATE "KhachHang" SET ${updates.join(', ')} WHERE "KhachHang"."ID" = ${user.ID};`;
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

