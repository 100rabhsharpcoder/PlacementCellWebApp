const express =  require('express');
const router =  express.Router();
const passport = require('passport')

const studentController =require('../controllers/student_controller');

// for redirecting add_student tamplate
router.get('/create',passport.checkAuthentication, studentController.createStudentsPages);
// for deleting studnet 
router.get('/delete/:id', passport.checkAuthentication,studentController.deleteStudent);

// for creating student with all details
router.post('/create-student',passport.checkAuthentication, studentController.createStudents)


module.exports = router;