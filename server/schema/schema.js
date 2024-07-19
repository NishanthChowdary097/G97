let mongoose = require('mongoose');
//add lang in user scema
let userSchema=new mongoose.Schema({
    mail:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    fav:[{type:String}]
})

let user = new mongoose.model('users',userSchema);

let recipeScema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    inredients:{
        type:[{type:String}]
    },
    steps:{
        type:[{type:String}]
    },
    tags:{
        type:[{type:String}]
    },
    user:{
        type:String,
        required:true
    }
})

let recipe = new mongoose.model('recipes',recipeScema);

module.exports= {recipe,user};