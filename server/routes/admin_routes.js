const express = require("express")
const route = express.Router();
const {admin}=require("../schema/adminschema");

route.get("/resipes",(req,res)=>{
    res.send("admin");
})