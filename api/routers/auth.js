const User = require("../models/User")
const express=require("express");
const bodyparse=express.urlencoded({extended:true});
const router=require("express").Router()
const CryptoJS=require("crypto-js")
const JWT=require("jsonwebtoken")


//register
router.post('/register',bodyparse,async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
        ).toString(),
    }) ;
 try{
   const saveUser=await newUser.save()
   res.status(201).json(saveUser)

 }catch(err){
    res.status(500).json(err)
 }
})
//login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );

        !user && res.status(401).json("Wrong password or username!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password or username");

        const accessToken = JWT.sign(
        {
            id:User._id,
            isAdmin: User.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"5d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports=router