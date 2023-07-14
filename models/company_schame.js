const mongoose = require('mongoose');


const companyschama = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    students:[{
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Student',
        },
        date:{
            type:Date,
            required:true
        },
        result:{
            type:String,
            enum:['On Hold', 'Selected', 'Pending', 'Not Selected', 'Did not Attempt']
        },
    }],
},{
    timestamps:true
});

const company =  mongoose.model('Company', companyschama);

module.exports =  company;