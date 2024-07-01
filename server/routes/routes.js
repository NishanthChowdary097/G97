const express = require("express")
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

//incomplete
route.delete("/remfav/:id",async (req,res)=>{
  let usr=req.usr;
  let id=req.params.id;
  if(usr.fav.includes(id)){
    usr.fav.splice(usr.fav.indexOf(id),1);
    await user.updateOne({_id:usr._id},{$set:{fav:usr}})
    res.send(JSON.stringify({
      error:false,
      status:"removed from fav"
    }));
  }else{
    res.send(JSON.stringify({
      error:true,
      status:"not in fav"
    }));
}});

//done
route.post('/addrecipe',async (req,res)=>{
  try{
  let recip={
        "name":req.body.name,
        "inredients":req.body.ingredients,
        "steps":req.body.steps,
        "tags":req.body.tags,
        "image":req.body.image,
        "user":req.usr._id
    }
    let resp = await new recipe(recip).save();
    if(resp){
      res.send(JSON.stringify({
        error:false,
        status:"recipe added"
      }));
    }else{
      res.send(JSON.stringify({
        error:true,
        status:"failed to add recipe"
      }));
    }
  }catch{
    res.status(500).send(JSON.stringify({
      "error":true,
      "msg":"server error"
    }));
  }
});

//incomplete
route.delete("/delete/:id",async (req,res)=>{
  try{let id=req.params.id;
  let dele = await recipe.deleteOne({_id:id});
  if(dele.deletedCount==1){
    res.send(JSON.stringify({
      "error":false,
      "msg":"recipe deleted"
    }));
  }else{
    res.send(JSON.stringify({
      "error":true,
      "msg":"recipe dose not exist"
    }));
  }}catch{
    res.status(500).send(JSON.stringify({
      "error":true,
      "msg":"server error"
    }));
  }
});

//incomplet, compleat the search engine
route.post('/search',async (req,res)=>{
  try{
    let tag=req.body.tag;
    var resp=await recipe.find({tags:{$in:tag}});
    res.send(JSON.stringify({
      error:false,
      data:resp
    }));
  }catch{
    res.status(500).send(JSON.stringify({
      "error":true,
      "msg":"server error"
    }));
  }
});

//incomplete with NLP
route.get("/generate",async (req,res)=>{
  res.send(JSON.stringify({
    "error":true,
    "msg":"not implemented"
  }));
})

//incomplete deletuser
route.delete("/signout",async (req,res)=>{
  await user.deleteOne({_id:req.usr._id});
  try{
    res.send(JSON.stringify({
      "error":false,
      "msg":"user deleted"
    }));
  }catch(err){
    res.send(JSON.stringify({
      "error":true,
      "msg":"user not found"
    }));
  }
});

//done
route.get("*",(_,res)=>{
  res.status(404).send({
    "error":true,
    "msg":"the page you are looking for is not looking for you"
    });
});

module.exports = route;