
const searchRouter = require('./search');
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const userRouter = require('./user');
const homeRouter = require('./home');
const cartRouter = require('./cart');

function route(app) {
    app.use('/cart',cartRouter);

    app.use('/search', searchRouter);

    app.use('/login', loginRouter);

    app.use('/register', registerRouter);

    app.use('/logout', logoutRouter);

    app.use('/user',userRouter);

    app.use('/',homeRouter)
}

module.exports = route;
