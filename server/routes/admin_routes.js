const express = require("express")
const route = express.Router();
const {admin}=require("../schema/adminschema");

route.get("/unreviwed",(req,res)=>{
    res.send("admin");
})

route.get("/review",(req,res)=>{
    res.send("admin");
})
