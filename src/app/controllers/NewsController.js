
class NewsControllers {
    //GET / news
    index(req,res){
        res.render('news');
    }
    // GET /news/:slug
    show(req,res){
        res.send("NEW SHOP");
    }
}

//exports gia tri nao thi =>> require nhan gia tri day
module.exports = new NewsControllers;

// const NewControllers = require('./NewController');