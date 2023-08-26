const express= require("express");
const bodyparser=require("body-parser");
let ejs = require('ejs');
const app= express();
const favicon = require('serve-favicon');
const path=require('path');
app.use(express.static("public"));
require('dotenv').config();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



let arr=[];

let url=[];
let heading=[];
let published=[];
var date = new Date();




 fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJPg1xTH9GT6ZUAxoc2HUWQ&maxResults=10000&order=date&key=AIzaSyD7DRkKTIBkjOGkEnnJkAyz1DfXqqzUq58`)
.then((response)=>{
    return response.json()

    
}).then( (data)=>{
    
    let items=data.items
    // console.log(items);
    items.forEach(element => {
        arr.push(element.id.videoId)
        url.push( "https://www.youtube.com/embed/" + element.id.videoId);
        
    
    });
    items.forEach(element1=>{
        heading.push(element1.snippet.title);
       let year = element1.snippet.publishTime.substring(0,4);
       let month=element1.snippet.publishTime.substring(5,7);
       let day= element1.snippet.publishTime.substring(8,10);
    //    console.log(day);

       published.push("Publish Date: " + day + "-" + month + "-" +year);

      
       
        
    
       
    
      
    })

})




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
   res.render("videos",{newListItem1: url, newListItem2:heading, newListItem3: published, front: url[0] , frontHeading: heading[0]});
})

app.get("/review",(req,res)=>{
    res.render("review")
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    if(req.body.email===process.env.email){
        res.render("appointment");
    }
})


let port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server started");
})

