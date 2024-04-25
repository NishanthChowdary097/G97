const express = require("express")
const route= express.Router();

route.get("/",(req,res)=>{
  res.send(JSON.stringify({
    "error":false,
    "msg":"good"
  }));
})




route.get("*",(req,res)=>{
  res.status(404).send({
    "error":true,
    "msg":"the page you are looking for is not looking for you"
    });
})

module.exports = route; 