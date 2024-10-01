const router=require("express").Router()
const express=require("express");
//const { verify, verifyAndAuthorization, verifyAdmin } = require("./verify");
const List = require("../models/List");
const bodyparse=express.urlencoded({extended:true});
const Crypto=require("crypto-js");
const verify = require("./verifyToken");

//CREATE

router.post("/", verify,bodyparse, async (req, res) => {
    
      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json(err);
      }
    
  });
  
  //DELETE
  
  router.delete("/:id", verify,bodyparse, async (req, res) => {
    
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("The list has been delete...");
      } catch (err) {
        res.status(500).json(err);
      }
   
  });
  //update 
  router.put("/:id",verify,bodyparse,async(req,res)=>{
    
    try{
       const UpdateList=await List.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       res.status(200).json(UpdateList)
    }catch(err){
        res.status(500).json(err)
    }


})
  //GET
  
  router.get("/", verify,bodyparse, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports=router