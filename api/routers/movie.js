const router=require("express").Router()
const express=require("express");
//const { verify, verifyAndAuthorization, verifyAdmin } = require("./verify");
const Movie = require("../models/Movie");
const bodyparse=express.urlencoded({extended:true});
const Crypto=require("crypto-js");
const verify = require("./verifyToken");



//create data :
router.post("/",verify,bodyparse,async(req,res)=>{
    
       const newMovie=new Movie(req.body)
    try{
       const saveMovie=await newMovie.save()
       res.status(200).json(saveMovie)
    }catch(err){
        //res.status(401).json(err)
        console.log(err)
    }


})

//update
router.put("/:id",verify,bodyparse,async(req,res)=>{
    
    try{
       const UpdateMovie=await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       res.status(200).json(UpdateMovie)
    }catch(err){
        res.status(500).json(err)
    }


})
//delete
router.delete("/:id",verify,bodyparse,async(req,res)=>{
    
    try{
       const UpdateMovie=await Movie.findByIdAndDelete(req.params.id)
       res.status(200).json("The movie has been deleted...!!")
    }catch(err){
        res.status(500).json(err)
    }


})

//GET

router.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET RANDOM

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }   
  });
  
  //GET ALL 
  
  router.get("/", verify, async (req, res) => {
    
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
   
  });

module.exports=router