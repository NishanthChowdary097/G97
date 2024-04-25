let mongoose = require('mongoose');

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
    fav:[{type:String}]
})

let user = new mongoose.model('users',userSchema);

let recipeScema = new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    steps:{
        type:[{type:String}]
    }
})

let recipe = new mongoose.model('recipes',recipeScema);

module.exports= {recipe,user};