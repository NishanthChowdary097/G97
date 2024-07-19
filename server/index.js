const express = require("express");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const { default: mongoose } = require("mongoose");

const app = express();
const port=process.env.PORT;

const {_,user} = require("./schema/schema");
const routes = require("./routes/routes");
const admin = require("./routes/admin_routes");

app.use(express.json())

let connect = async () => { 
    try{ 
        await mongoose.connect(process.env.DB_URI);
        console.log("db ready");
        return true
    }
    catch(err) {
        console.log(' error connecting');
        return false
    }
}
if(connect()){
    var db=mongoose.connection;
}
app.get("/stop",(req,res)=>{
    res.send(JSON.stringify({
        error:false,
        status:"sleeping"
    }));
    process.exit();
})
app.get("/",(req,res)=>{
    res.send(JSON.stringify({
        "error":"false",
        "msg":"server alive"
    }));
})

app.post("/signup",async (req,res)=>{
    let usn = req.body.user;
    let mail = req.body.mail;
    let pass = req.body.pass;
    
    var check = await user.findOne({mail});
    if(check){
        res.send(JSON.stringify({
            "error":true,
            "msg":"user exists"
        }));
    }else{
        let hp=await bcrypt.hash(pass, 10)
        await new user({mail:mail,username:usn,password:hp,fav:[]}).save()
        res.send(JSON.stringify({"error":false,"msg":"acc created"}));
    }
    
})

app.post('/login',async(req,res)=>{
    let mail = req.body.mail;
    let pass = req.body.pass;
    var check = await user.findOne({mail});
    
    if(check){
        if(await bcrypt.compare(pass,check.password)){
            // const token = jwt.sign({ mail: mail ,roll:"user",id:check._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
            const token = jwt.sign({ mail: mail ,roll:"user",id:check._id}, process.env.JWT_SECRET);

            res.send(JSON.stringify({
                "error":false,
                "token": token
            }));
        }
    }else{
        res.status(404).send(JSON.stringify({
            "error":true,
            "msg":"user not found"
        }));
    }
})

app.use('/v2',auth,routes);
app.use('/v3',auth,admin);
async function auth (req, res, next){
    var token = req.header('Authorization');
    if (!token) return res.status(401).json({erroe:true, msg: 'unauthorized' });
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const mail = decodedToken.mail;
      const us = await user.findOne({mail});
      if (!us) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.usr = us;
      next();
    } catch (error) {
    //   console.log('Token Verification Error:', error);
      return res.status(403).json({ message: 'Forbidden' });
    }
  };

app.get("*",(_,res)=>{
    res.status(404).send({
        "error":true,
        "msg":"the page you are looking for is not looking for you"
    });
})
app.post("*",(_,res)=>{
    res.status(404).send({
        "error":true,
        "msg":"the page you are looking for is not looking for you"
    });
})

app.listen(port,()=>{
    console.log(`server ready at ${port}`);
})


  