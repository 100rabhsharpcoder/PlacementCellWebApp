const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

// for setting hashed password
userSchema.virtual('password').set(function(value){
    this.passwordHash =  bcrypt.hashSync(value, 12);
});

//fiunction to compare hashed password 
userSchema.methods.isPasswordCorrect= function(password){
    return bcrypt.compareSync(password,this.passwordHash);
}


const User =  mongoose.model('User', userSchema);

module.exports= User;