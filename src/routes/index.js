const newsRouter = require('./news')
const siteRouter = require('./site')


// const db = require('../config/db/index');



function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // })

    // app.get('/news', (req, res) => {
    //     res.render('news');
    // })
    // app.use('/abc',db);

    app.use('/news',newsRouter);

    app.use('/',siteRouter);

}

module.exports = route;
