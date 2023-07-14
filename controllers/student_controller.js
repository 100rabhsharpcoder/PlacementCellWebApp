const Student =  require('../models/student_Schema');
const Company = require('../models/company_schame');



// controller action for rendering create student
module.exports.createStudentsPages = async function(req,res){
    return res.render('add_student');
}


//Controller action for  creating student 

module.exports.createStudents= async function(req,res){
    const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;

    try{
        const student = await Student.findOne({ email });
        if(student){
            console.log('Student si already rejistered with same mail');
        }
    
        const  newStudent =  await Student.create({
           name, email, college, batch, placement, contactNumber,dsa,webd,react
        });
        await newStudent.save();
    
        return res.redirect('back');
    }catch(err){
        console.log('error in creating student ', err);
        return res.redirect('back');
    }
}


// editing updating or deleting the student 
module.exports.deleteStudent = async function(req,res){

    // storing student id form params
    const {id} = req.params;
    try{
        // finding student for params id
        const student = await Student.findById(id);
        // finding the students for which companies is interviewed and delete or edit

        if (student && student.interviews.length > 0) {
			for (let item of student.interviews) {
				const company = await Company.findOne({ name: item.company });
				if (company) {
					for (let i = 0; i < company.students.length; i++) {
						if (company.students[i].student.toString() === id) {
							company.students.splice(i, 1);
							company.save();
							break;
						}
					}
				}
			}
		}
		await Student.findByIdAndDelete(id);
		res.redirect('back');
    }catch(err){
        console.log('not able to deleting student', err);
		return res.redirect('back');

    }
};



