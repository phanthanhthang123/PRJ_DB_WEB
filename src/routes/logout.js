const express = require('express');
const router = express.Router();
const logoutController = require('../app/controllers/LogoutController');
//[get] /logout/
router.get('/',logoutController.getlogout);

//[get] /logout/:slug
router.get('/:slug',logoutController.error);


module.exports = router;
