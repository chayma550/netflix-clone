const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const AuthRoute=require("./routers/auth");
const userRoute=require("./routers/user");
const movieRoute=require("./routers/movie")
const listRoute=require("./routers/list")
const bodyparse = require('body-parser');
const cors=require("cors")
app.use(bodyparse.json());

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>
console.log("DB connecting ")).catch((err)=>{
  console.log(err)  
})

app.use(cors({origin:"http://localhost:3000",credentials:true}));

app.use("/api/auth",AuthRoute)
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists",listRoute)
app.listen(process.env.PORT||5000,()=>{
    console.log("server is runing on port 5000!!")
})

