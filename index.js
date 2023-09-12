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

"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "tanmay631@gmail.com",
    pass: "Tanmay8076676966",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"tanmay631@gmail.com', // sender address
    to: "tanmay6311@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);




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
    name: String,
    Phone: String
    
    ,
    email: String
    
    ,
    date:String,
    time: String,
    message: String,
    

}

//Appointment Fetch;

const DPMHC= mongoose.model("DPMHC",schema);

let Name=[]
        let Email=[]
        let Date=[]
        let Time=[]
        let Message=[]
        let Phone =[]
        DPMHC.find().then(function(foundItems){
   


            foundItems.forEach(element => {
               Name.push(element.name)
                Phone.push(element.Phone)
                Email.push(element.email)
                Message.push(element.message)
                Time.push(element.time)
                Date.push(element.date)
                
                
                
            });
        
            
          })
        
          .catch(function(err){
            console.log(err);
          });
        



app.get("/",(req,res)=>{
    res.render("homepage");
})

app.get("/home",(req,res)=>{
    res.render("homepage");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/about-us",(req,res)=>{
    res.render("about");
})

app.get("/contact-us",(req,res)=>{
    res.render("/appointmet")
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
    
   
    if(req.body.email===process.env.email && req.body.password===process.env.password){
        
 
                 
        res.render("AllApps", { Name: Name, Message: Message, Date: Date, Time: Time, Email: Email, Phone:Phone});
          }

          else{
            res.render("failure");
          }

          


    })


app.post("/appointment",(req,res)=>{
    let name= req.body.name;
    let phone=req.body.phone;
    let email=req.body.email;
    let date=req.body.date;
    let time=req.body.time;
    let message=req.body.message;
                Name.push(name)
                Phone.push(phone)
                Email.push(email)
                Message.push(message)
                Time.push(time)
                Date.push(date)
    
    let newAppointment= new DPMHC({
    name: name,
    Phone: phone,
    email: email,
    date: date,
    time: time,
    message: message
        
    });


    
    console.log(name);

    newAppointment.save();

    
    
    
    res.render("success")
    })

let port=process.env.PORT || 3000;
    
          setInterval(async () => {
              const res = await fetch(`https://dpmemorial.com/`);
          }, 899990);

app.listen(port,()=>{
    console.log("Server started");
})


