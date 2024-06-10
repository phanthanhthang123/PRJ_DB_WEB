const express = require('express');
const router = express.Router();
const registercontroller = require('../app/controllers/RegisterController');

router.get('/:slug',registercontroller.error);
router.get('/',registercontroller.getregister);
router.post('/',registercontroller.postregister);


module.exports = router;