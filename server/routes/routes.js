const express = require("express")
/**
* Initializes an Express router instance.
* This router instance can be used to define routes and handle HTTP requests for the application.
*/
const route = express.Router();
const {recipe,user}=require("../schema/schema");

//done
route.get("/",(_,res)=>{
  res.send(JSON.stringify({
    "error":false,
    "msg":"good"
  }));
});

//done
route.get("/addfav/:id",async (req,res)=>{
    let usr=req.usr;
    let id=req.params.id;
    usr.fav.push(id);
    await user.updateOne({_id:usr._id},{$set:{fav:usr.fav}});
    
    res.send(JSON.stringify({
      error:false,
      status:"added to fav"
    }));
});

//done
route.get("/myfav",async (req,res)=>{
    res.send(JSON.stringify({
      "error":false,
      "fav":req.usr.fav
    }))
});

//done
route.get("/myfav/:fav",async (req,res)=>{
  let resp=await recipe.find({_id:req.params.fav})
  res.send(JSON.stringify({
      "error":false,
      "data":resp[0]
  }));
});

//done
route.post('/addrecipe',async (req,res)=>{
  let recip={
        "name":req.body.name,
        "inredients":req.body.ingredients,
        "steps":req.body.steps,
        "tags":req.body.tags,
        "image":req.body.image,
        "user":req.usr._id
    }
    await new recipe(recip).save();
    res.send(JSON.stringify({
      error:false,
      status:"recipe added"
    }));
});

//done
route.get("*",(_,res)=>{
  res.status(404).send({
    "error":true,
    "msg":"the page you are looking for is not looking for you"
    });
});

module.exports = route; 