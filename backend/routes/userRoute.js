const express = require('express');
const router = express.Router();
const {addUser,getUsers,getUser,updateUser,deleteUser} = require("../handlers/userHandle")


//Add or insert data into collection
router.post("/users", async (req,res)=>{
    //add user operation
    let user = await addUser(req.body);
    res.send(user);
  })
  //end Add or insert data into collection
  
  
  //fetch data
  router.get("/users", async (req,res)=>{
    //add user operation
   let users = await getUsers();
    res.send(users);
  })
  //end fetch data

  //get by id

  router.get("/users/:id", async (req,res)=>{
    //add user operation
    console.log("id",req.params["id"]);
   let user = await getUser(req.params["id"]);
    res.send(user);
  })
  //end get by id

  //put update
  router.put("/users/:id", async (req,res)=>{
    //add user operation
    console.log('id',req.params["id"]);
   await updateUser(req.params["id"],req.body);
    res.send({});
  })
  //put end

  //delete user
  router.delete("/users/:id", async (req,res)=>{
    //add user operation
    console.log('id',req.params["id"]);
   await deleteUser(req.params["id"]);
    res.send({});
  })
  //end delete

  module.exports = router;