
class LogoutController {
    //get /logout
    getlogout(req, res) {
        req.session.user = null;
        res.redirect('/');
    }
    //get /logout/:slug
    error(req,res){
        res.send('ERROR');
    }
}

module.exports = new LogoutController;