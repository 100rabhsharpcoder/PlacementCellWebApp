const Company = require('../models/company_schame');
const Student = require('../models/student_Schema');

//controller action for rendering company page

module.exports.companyPage = async function(req,res){
    try{
        const students= await Student.find({});
       return res.render('company', {students});
       
    
    }catch(err){
    console.log(`Error in rendering page: ${err}`);
        return res.redirect('back');
    }
};

// controller action for allocate the interview
module.exports.allocateInterview = async function(req,res){
    try{
        const students = await Student.find({});
         let array =[];

         for(let student of students){
            array.push(student.batch);
         }
      // filerign if there is any duplocated student there 
         array = [...new Set(array)];
         return res.render('allocateInterview',{
            students, array
         });

    }catch(err){
        console.log(`Error in allocating interview: ${err}`);
        return res.redirect('back');

    }
};


//controller action for scheduling interview for students

module.exports.scheduleInterview = async function(req,res){
    const {id,company,date}=req.body;
    try{
        const existingCompany = await Company.findOne({name:company});
        const obj = {
            student:id,
            date,
            result:'Pending'
        };
        // if there is new company or company is not exist
        if(!existingCompany){
            const newCompany = await Company.create({
                name:company
            });
            newCompany.students.push(obj);
            newCompany.save();
        }else{
            for(let student of existingCompany.students){
                if(student.student._id===id){
                    console.log('Interview with this student already scheduled');
                     return res.redirect('back');

                }
            }
            existingCompany.students.push(obj);
            existingCompany.save();
        }
        const student = await Student.findById(id);
        if(student){
            const interview = {
                company,
                date,
                result:'Pending'
            };
            student.interviews.push(interview);
            student.save();
        }
        console.log('Interview Scheduled Successfully');
        return res.redirect('/company/home');


    }catch(err){
        console.log(`Error in scheduling Interview: ${err}`);
        return res.redirect('back');
    }
}



// controller action for interview status update
module.exports.updateStatus = async function (req, res) {
    const { id } = req.params;
    const { companyName, companyResult } = req.body;
  
    try {
      const student = await Student.findById(id);
  
      if (student && student.interviews.length > 0) {
        for (let company of student.interviews) {
          if (company.company === companyName) {
            company.result = companyResult;
            break;
          }
        }
        await student.save();
      }
  
      const company = await Company.findOne({ name: companyName });
  
      if (company) {
        for (let std of company.students) {
          if (std.student.toString() === id) {
            std.result = companyResult;
            break;
          }
        }
        await Company.findByIdAndUpdate(company._id, company);
      }
  
      console.log('Interview Status Changed Successfully');
      return res.redirect('back');
    } catch (err) {
      console.log(`Error in updating status: ${err}`);
      return res.redirect('back');
    }
  };