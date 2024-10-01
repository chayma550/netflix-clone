const router=require("express").Router();
const express=require("express");
//const { verify, verifyAndAuthorization, verifyAdmin } = require("./verify");
const User = require("../models/User");
const bodyparse=express.urlencoded({extended:true});
const Crypto=require("crypto-js");
const verify = require("./verifyToken");


//update data:
router.put("/:id",verify,bodyparse,async(req,res)=>{
  if(req.body.password){
    req.body.password=Crypto.AES.encrypt(
        req.body.password,process.env.PASS_SEC
    ).toString()
  }
    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true})
        res.status(201).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete user
router.delete("/:id",verify,bodyparse,async(req,res)=>{
   try{
       const deleteUser=await User.findByIdAndDelete(req.params.id)
       res.status(201).json(deleteUser)

   }catch(err){
    res.status(500).json(err)
   }
})

//Get all users:
router.get("/",async(req,res)=>{
    const query=req.query.new
    try{

        const users=query ? await  User.find().sort({_id:-1}).limit(2) : User.find()
        res.status(201).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})

//get user stats

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router