
const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

//[GET] /
router.get('/',homeController.gethome);


module.exports = router;