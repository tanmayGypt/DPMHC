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

const mongoose = require('mongoose');
mongoose.connect(`${process.env.mongourl}`, {
useNewUrlParser: true});

let arr=[];

let url=[];
let heading=[];
let tnils=[];
let published=[];
var date = new Date();





 fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJPg1xTH9GT6ZUAxoc2HUWQ&maxResults=10000&order=date&key=${process.env.API_KEY}`)
.then((response)=>{
    return response.json()

    
}).then( (data)=>{
    
    
    let items=data.items
    // console.log(items);
    items.forEach(element => {
        tnils.push(element.snippet.thumbnails.high.url);

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


const schema ={
    name: {
        type: String,
    required: true
    },
    Phone: {
        type: String,
    required: true
    },
    email: {
        type: String,
    required: true
    },
    date: {
        type: String,
    required: true
    },
    time: {
        type: String,
    required: true
    },
    message: {
        type: String,
    required: true
    }

}

const DPMHC= mongoose.model("DPMHC",schema);


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
   res.render("videos",{newListItem1: tnils, newListItem2:heading, newListItem3: published, front: url[0] , frontHeading: heading[0],newListItem4:url});
})

app.get("/review",(req,res)=>{
    res.render("review")
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    if(req.body.email===process.env.email){
        res.render("AllApps");
        console.log(req.body.email)
    }
})

app.post("/appointment",(req,res)=>{
    let name= req.body.name;
    let phone=req.body.phone;
    let email=req.body.email;
    let date=req.body.date;
    let time=req.body.time;
    let message=req.body.message;
    let newAppointment= new DPMHC({
    name: name,
    Phone: phone,
    email: email,
    date: date,
    time: time,
    message: message
        
    });
    console.log(name);

    newAppointment.save()

    res.render("success")
})


let port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server started");
})

