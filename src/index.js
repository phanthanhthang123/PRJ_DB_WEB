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

app.get('/update-product-page' , async (req,res) =>{
    console.log(req.session.product);
    res.render('update_product',{
        user : req.session.user,
        product:req.session.product,
    })
})

//express = require('express');
// app = express();
const route = require('./routes/main');
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
