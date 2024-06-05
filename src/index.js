const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require("express-handlebars");
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');

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
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));





const db = require('./config/db');

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { fullname, email, password, password_confirmation } = req.body;

    if (fullname && email && password && password_confirmation) {
        console.log(fullname, email, password, password_confirmation);
        try {
            // Kiểm tra xem email đã tồn tại trong DB chưa
            const emailCheckQuery = 'SELECT * FROM users WHERE user_email = $1';
            const emailCheckResult = await db.query(emailCheckQuery, [email]);
            if (emailCheckResult.rows.length > 0) {
                console.log('Tai khoan');
                return res.render('register', { Message: 'Tài khoản email đã tồn tại' });
            }
            else {
                // Nếu email chưa tồn tại, tiến hành insert
                const queryText = `
                insert into users(user_name,user_email,user_password)
                values ($1,$2,$3);
                `;
                await db.query(queryText, [fullname, email, password]);
                console.log('User registered successfully');
                return res.render('register', { Message: 'Đăng kí tài khoản thành công,hãy đăng nhập để mua sắm' });
            }
        } catch (err) {
            console.error('Database error', err);
            return res.render('register', { Message: 'Internal Server Error' });
        }

    }
});

app.get('/login', (req, res) => {
    res.render('login');
})




app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    const queryText = 'SELECT * FROM products WHERE products.product_name ILIKE $1'
    const values = [`%${searchQuery}%`];

    db.query(queryText, values, (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(queryRes.rows);
            res.render('search', {
                data: queryRes.rows,
                value: searchQuery
            });
        }
    });
})

async function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE user_email = $1';
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password); // Xem dữ liệu gửi lên từ form

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

        if (password != user.user_password) {
            // Nếu mật khẩu không khớp
            return res.status(401).render('login', { message: 'Mật khẩu không chính xác!' });
        }
        // Nếu mọi thứ ổn, chuyển hướng người dùng tới trang chủ
        return res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { message: 'Lỗi server khi đăng nhập!' });
    }
});

app.get('/', (req, res) => {
    db.query('select * from products', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('home', {
                data: result.rows
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
