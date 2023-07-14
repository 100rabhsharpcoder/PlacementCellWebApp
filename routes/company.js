const express =  require('express');

const router = express.Router();
const passport  =  require('passport');
const companyController =  require('../controllers/comapny_controller');

//routes for company page
router.get('/home',passport.checkAuthentication,companyController.companyPage);
// routes for interview allocation 
router.get('/allocate', passport.checkAuthentication, companyController.allocateInterview);

// routes for scheduling interview
router.post('/schedule-interview',passport.checkAuthentication,companyController.scheduleInterview);
//routes for updating interview status 
router.post('/update-status/:id', passport.checkAuthentication, companyController.updateStatus);



module.exports= router;