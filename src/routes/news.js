const express = require('express');
const router = express.Router();

const newcontroller = require('../app/controllers/NewsController');

router.use('/:slug',newcontroller.show);
router.use('/',newcontroller.index);

module.exports = router;
