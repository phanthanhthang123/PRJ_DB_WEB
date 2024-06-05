
class SiteControllers {
    //GET /
    index(req,res){
        res.render('home');
    }
    // GET /search
    search(req,res){
        res.render("search");
    }
}

//exports gia tri nao thi =>> require nhan gia tri day
module.exports = new SiteControllers;

// const NewControllers = require('./NewController');