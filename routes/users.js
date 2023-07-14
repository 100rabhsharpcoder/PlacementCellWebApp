const express = require('express');
const passport = require('passport');
const router = express.Router();


const usersController = require('../controllers/users_controllers');
// for signup tyhe user
router.get('/signup', usersController.signup);
// for sign in the user
router.get('/signin', usersController.signin);
// for sign out the user
router.get('/signout',usersController.signout);
//for download report in csv file
router.get('/download-csv', usersController.reportDownloadCsv);



router.post('/create', usersController.createUser);
// router.post('/create-session', usersController.createSession)
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/signin' }), usersController.createSession);









module.exports = router;