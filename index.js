const express= require("express");
const bodyparser=require("body-parser");
let ejs = require('ejs');
const app= express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');



app.get("/",(req,res)=>{
    res.render("homepage");
})

app.get("/home",(req,res)=>{
    res.render("homepage");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/appointment",(req,res)=>{
    res.render("appointment");
})

app.get("/videos",(req,res)=>{
    res.render("videos")
})

app.get("/review",(req,res)=>{
    res.render("review")
})


let port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server started");
})