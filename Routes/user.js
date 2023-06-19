const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userC')



router.post('/user/identify',  userController.userD)




module.exports = router