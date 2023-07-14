const Student  = require('../models/student_Schema')

// controller action for home page
module.exports.home =async function(req,res){
  const students = await Student.find({});

    return res.render('home',{
        students
    });
}