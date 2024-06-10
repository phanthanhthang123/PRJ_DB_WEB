
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

//[GET] /user/:slug
router.get('/:slug',userController.error);

//[GET] /user
router.get('/',userController.getuser);

//[POST] /user
router.post('/',userController.postuser);


module.exports = router;
