const express = require("express")
/**
* Initializes an Express router instance.
* This router instance can be used to define routes and handle HTTP requests for the application.
*/
const route = express.Router();
const {recipe,user}=require("../schema/schema");
const veerasimhareddy=require("../schema/reddis");

const reddy= new  veerasimhareddy();
reddy.start();

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
    if(usr.fav.includes(id)){
        res.send(JSON.stringify({
          error:true,
          status:"already in fav"
        }));
    }else{
        usr.fav.push(id);
        await user.updateOne({_id:usr._id},{$set:{fav:usr.fav}});
    
        res.send(JSON.stringify({
          error:false,
          status:"added to fav"
        }));
    }
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
  if(await reddy.exists(req.params.fav)){
    res.send(JSON.stringify({
      "error":false,
      "data":await reddy.getrecipe(req.params.fav)
    }));
  }else{
    const resp=await recipe.find({_id:req.params.fav})
    data=[]
    resp[0]["inredients"].forEach(element => {
      data.push(element);
    });
    // var data=resp[0]["inredients"];
    data.push(resp[0]["image"]);
    data.push(resp[0]["name"]);
    reddy.addrecipe(req.params.fav,data);
    
    res.send(JSON.stringify({
        "error":false,
        "data":resp[0]
    }));
  }
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

//in compleat compleat the search engine
route.post('/search',async (req,res)=>{
  let tag=req.body.tag;
  var resp=await recipe.find({tags:{$in:tag}});
  res.send(JSON.stringify({
    error:false,
    data:resp
  }));
});

route.get("/generate",async (req,res)=>{
  res.send(JSON.stringify({
    "error":true,
    "msg":"not implemented"
  }));
})

//done
route.get("*",(_,res)=>{
  res.status(404).send({
    "error":true,
    "msg":"the page you are looking for is not looking for you"
    });
});

module.exports = route; 