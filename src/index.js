const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require("express-handlebars");
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const session = require('express-session');

app.use(session({
    secret: 'your_secret_key', // Một chuỗi bí mật để mã hóa session ID
    resave: false,             // Không lưu lại session nếu không có gì thay đổi
    saveUninitialized: false,  // Không lưu session mới nếu chưa được sửa đổi
    cookie: { secure: false }  // True nếu bạn đang sử dụng HTTPS
}));

// const user = null;

// Sử dụng static middleware
app.use(express.static(path.join(__dirname, 'public')));

//lay du lieu tu form data
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// http logger
app.use(morgan('combined'));

// Template engine
app.engine("hbs", engine({
    extname: '.hbs',
    helpers: {
        equals: (arg1, arg2) => arg1 === arg2
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));





const db = require('./config/db');

// app.get('/register', (req, res) => {
//     res.render('register');
// })

// app.post('/register', async (req, res) => {
//     const { fullname, email, password, password_confirmation } = req.body;

//     if (fullname && email && password && password_confirmation) {
//         // console.log(fullname, email, password, password_confirmation);
//         try {
//             // Kiểm tra xem email đã tồn tại trong DB chưa
//             const emailCheckQuery = 'SELECT * FROM "NguoiDung" WHERE "TaiKhoan" = $1';
//             const emailCheckResult = await db.query(emailCheckQuery, [email]);
//             if (emailCheckResult.rows.length > 0) {
//                 return res.status(400).render('register', { message: 'Tài khoản email đã tồn tại' });
//             }
//             else {
//                 // Nếu email chưa tồn tại, tiến hành insert
//                 const queryText = `
//                 insert into "NguoiDung"("TenND","TaiKhoan","MatKhau")
//                 values ($1,$2,$3);
//                 `;
//                 await db.query(queryText, [fullname, email, password]);
//                 // console.log('User registered successfully');
//                 return res.render('register', { message: 'Đăng kí tài khoản thành công,hãy đăng nhập để mua sắm' });
//             }
//         } catch (err) {
//             console.error('Database error', err);
//             return res.status(400).render('register', { message: 'Lỗi kết nối tới server' });
//         }

//     }
// });


// app.get('/search', (req, res) => {
//     const searchQuery = req.query.q;
//     const queryText = 'SELECT * FROM "SanPham" WHERE "SanPham"."TenSP" ILIKE $1'
//     const values = [`%${searchQuery}%`];
//     db.query(queryText, values, (err, queryRes) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Lỗi kết nối tới Server');
//         } else {
//             console.log(req.session.user);
//             if (req.session && req.session.user) {
//                 res.render('search', {
//                     user: req.session.user,
//                     data: queryRes.rows,
//                     value: searchQuery
//                 });
//             } else {
//                 res.render('search', {
//                     data: queryRes.rows,
//                     value: searchQuery
//                 });
//             }
//         }
//     });
// })

// async function getUserByEmail(email) {
//     const query = 'SELECT * FROM "NguoiDung" nd WHERE nd."TaiKhoan" = $1';
//     try {
//         const result = await db.query(query, [email]);
//         if (result.rows.length > 0) {
//             return result.rows[0]; // Trả về người dùng đầu tiên tìm thấy
//         } else {
//             return null; // Không tìm thấy người dùng
//         }
//     } catch (error) {
//         console.error('Error getting user by email:', error);
//         throw error; // Ném lỗi để xử lý bên ngoài
//     }
// }

// app.get('/login', (req, res) => {
//     res.render('login');
// })

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     // console.log(email, password); // Xem dữ liệu gửi lên từ form

//     if (!email || !password) {
//         // Kiểm tra nếu email hoặc mật khẩu không được cung cấp
//         return res.status(400).render('login', { message: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
//     }
//     try {
//         const user = await getUserByEmail(email);
//         if (!user) {
//             // Nếu không tìm thấy người dùng
//             return res.status(401).render('login', { message: 'Tài khoản không tồn tại!' });
//         }

//         if (password != user.MatKhau) {
//             // Nếu mật khẩu không khớp

//             return res.status(401).render('login', { message: 'Mật khẩu không chính xác!' });
//         }
//         // Nếu mọi thứ ổn, chuyển hướng người dùng tới trang chủ
//         else {
//             req.session.user = user;  // Lưu thông tin người dùng vào session
//             console.log(req.session.user);
//             return res.redirect('/');
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).render('login', { message: 'Lỗi server khi đăng nhập!' });
//     }
// });

// app.get('/logout', (req, res) => {
//     req.session.user = null;
//     res.redirect('/');
// })

// app.get('/user', (req, res) => {
//     res.render('user', {
//         user: req.session.user,
//         message: req.session.message
//     });
//     // Xóa thông báo sau khi đã hiển thị để không hiển thị lại lần nữa
//     delete req.session.message;
// })

// app.post('/user', async (req, res) => {
//     const { hovaten, email, gioitinh, sodienthoai, sinhnhat, diachi } = req.body;
//     const user = req.session.user;
//     let updates = [];
//     let updateFields = {}; // Để lưu trữ các trường được cập nhật

//     if (hovaten) {
//         updates.push(`"TenND" = '${hovaten}'`);
//         updateFields.TenND = hovaten;
//     }
//     if (email) {
//         updates.push(`"TaiKhoan" = '${email}'`);
//         updateFields.TaiKhoan = email;
//     }
//     if (gioitinh) {
//         updates.push(`"GioiTinh" = '${gioitinh}'`);
//         updateFields.GioiTinh = gioitinh;
//     }
//     if (sodienthoai) {
//         updates.push(`"SoDienThoai" = '${sodienthoai}'`);
//         updateFields.SoDienThoai = sodienthoai;
//     }
//     if (sinhnhat) {
//         updates.push(`"SinhNhat" = '${sinhnhat}'`);
//         updateFields.SinhNhat = sinhnhat;
//     }
//     if (diachi) {
//         updates.push(`"DiaChi" = '${diachi}'`);
//         updateFields.DiaChi = diachi;
//     }
//     if (updates.length > 0) {
//         const query = `UPDATE "NguoiDung" SET ${updates.join(', ')} WHERE "NguoiDung"."ID" = ${user.ID};`;
//         try {
//             await db.query(query); // Sử dụng truy vấn đã được tạo
//             // Cập nhật session user
//             Object.assign(req.session.user, updateFields);
//             req.session.message = 'Cập nhật thông tin thành công';
//         } catch (error) {
//             console.error('Error updating user:', error);
//             req.session.message = 'Cập nhật thông tin thất bại';
//         }
//         res.redirect('/user');
//     } else {
//         req.session.message = 'Không có thông tin nào để cập nhật';
//         res.redirect('/user');
//     }
// });

app.get('/update-product-page' , async (req,res) =>{
    console.log(req.session.product);
    res.render('update_product',{
        user : req.session.user,
        product:req.session.product,
    })
})

// app.get('/', (req, res) => {
//     db.query('select * from "SanPham" ', (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             req.session.product = result.rows;
//             // console.log(req.session); // Kiểm tra xem bên trong req.session có gì
//             if (req.session && req.session.user) {
//                 res.render('home', {
//                     user: req.session.user,
//                     data: result.rows
//                 });
//             } else {
//                 res.render('home', {
//                     data: result.rows
//                 });
//             }
//         }
//     });
// });

//express = require('express');
// app = express();
const route = require('./routes/main');
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
