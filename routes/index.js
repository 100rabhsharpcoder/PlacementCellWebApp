const express = require('express');

const router = express.Router();
const passport =  require('passport');
const homeController = require('../controllers/home_controller');



router.get('/', passport.checkAuthentication, homeController.home); // authentiation not done
// routes for users routes
router.use('/users',require('./users'));
// routes for Students routes
router.use('/students', require('./students'));
// routes for company routes
router.use('/company', require('./company'));




module.exports =router;