const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/:slug',loginController.error);

// Xử lý yêu cầu GET tới /login
router.get('/', loginController.getlogin);

// Xử lý yêu cầu POST tới /login
router.post('/', loginController.postlogin);


module.exports = router;