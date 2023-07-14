const mongoose = require('mongoose');
 
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://saurabhgathade:5M0vkOXTuAPpVIpa@cluster0.kl1fyn7.mongodb.net/');

const db  =mongoose.connection;

db.on('error', console.error.bind(console,"Error in connecting mongodb "));

db.once('open', function(){
    console.log('connected to database  Placemnet Cell Web App')
});


module.exports =  db;


// password 5M0vkOXTuAPpVIpa   saurabhgathade   url
//   mongodb+srv://saurabhgathade:5M0vkOXTuAPpVIpa@cluster0.kl1fyn7.mongodb.net/
// mongodb+srv://saurabhgathade:5M0vkOXTuAPpVIpa@cluster0.kl1fyn7.mongodb.net/ 

