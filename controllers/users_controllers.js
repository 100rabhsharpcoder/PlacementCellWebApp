const { request } = require('express');
const User =  require('../models/usersSchema');
const Student =  require('../models/student_Schema');

const fs = require('fs');


// controller action for  rendering sign up page
module.exports.signup = function(req,res){
    //authentication is not done yet
    return res.render('signup');
}
 

//controller action for redering sign in page 
module.exports.signin=function(req,res){
    //authentication is not done yet
    return res.render('signin');
}



// controller action for  signout or logout
module.exports.signout = function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	return res.redirect('/users/signin');
};


// controller action for create session
module.exports.createSession = function (req, res) {
	console.log('Session created successfully');
	return res.redirect('/');
};





//controller action for creating user 

module.exports.createUser = async function (req, res) {
	const { name, email, password, confirmPassword } = req.body;
	try {
	  if (password !== confirmPassword) {
		console.log(`Passwords don't match`);
		return res.redirect('back');
		// return res.redirect('/users/signin');
	  }
  
	  const user = await User.findOne({ email });
  
	  if (user) {
		console.log(`Email already exists`);
		return res.redirect('/users/signin');
	  }
  
	  const newUser = await User.create({
		name,
		email,
		password,
	  });
  
	  if (!newUser) {
		console.log(`Error in creating user`);
		return res.redirect('back');
	  }
  
	  return res.redirect('/users/signin');
	} catch (error) {
	  console.log(`Error in creating user: ${error}`);
	  res.redirect('back');
	}
  };




// Controlller action for downloading the report in csv file

module.exports.reportDownloadCsv = async function(req,res){
    try{
        const students =await Student.find({});

        let data = '';
        let SrNo =1;
        let csv = ' S.no, Name, Email, College, Placement, Contact Number, Batch, DSA Score, WebDevelpment Score, React Score, Interview, Date, Result';

        for(let student of students){
            data =  SrNo + 
            ',' + 
            student.name +
            ','+
            student.email +
            ',' +
            student.college +
            ',' +
            student.placement +
            ',' + 
            student.contactNumber +
            ',' +
            student.batch +
            ',' + 
            student.dsa +
            ',' + 
            student.webd +
            ',' +
            student.react;
            if(student.interviews.length > 0){
                for( let interview of student.interviews){
                    data += ',' + interview.company+
                    ',' + interview.date.toString()+
                     ',' + interview.result;
                }
            }
            SrNo++;
            csv += '\n' + data;
        }
        
        const datafile =  fs.writeFile('report/data.csv' , csv, function(err, data){
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            console.log('Interview sheet is generated in CSV format file Name Data.cvs');

            return res.download('report/data.csv');
        });



    }catch(err){

        console.log(`Error in downloading file: ${err}`);
		return res.redirect('back');

    }
}