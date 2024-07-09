let mongoose = require('mongoose');
//add lang in user scema
let adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let admin = new mongoose.model('users',adminSchema);


module.exports= {recipe};