const mongoose = require('mongoose');
 
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/studentPlacementCellApp');

const db  =mongoose.connection;

db.on('error', console.error.bind(console,"Error in connecting mongodb "));

db.once('open', function(){
    console.log('connected to database name Student Placemnet Cell')
});


module.exports =  db;
