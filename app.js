const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-nexcap:database3330@nexcap.utwcaig.mongodb.net/Nexcap", {useNewUrlParser: true, useUnifiedTopology: true });


const EmpSchema = {
        Emp_ID : String,
        FirstName : String,
        LastName : String,
        Email_ID : String,
        DOB : String,
        Blood : String,
        Sex : String,
        Age : Number,
        phn_no : Number,
        Image: String   
 
}


const Emp1 = mongoose.model("emp_nexcaps", EmpSchema);


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

var key = makeid(10);
var keyver = key;


app.get("/",function(req,res){
    res.send("<h1>Scan QR</h1>")
})


app.get("/terms",function(req,res){
    res.render("terms")
})

app.get("/privacy",function(req,res){
    res.render("privacy")
})









app.get("/:emp_ID", function(req,res){
    
    if (key === keyver){
        Emp1.findOne({Emp_ID: req.params.emp_ID},function(err , found){
            if (err){
                console.log(found)
                res.send("Please use QR")
            } else{
                if (found === null){
                    console.log(found)  
                    res.send("<h1>Please use QR</h1>")
                }else{
                    console.log(found)
                    res.render("index",
                {
                    
                    EmpID: found.Emp_ID,
                    Image:found.Image,
                    FirstName:found.FirstName,
                    LastName:found.LastName,
                    Email_ID:found.Email_ID,
                    DOB:found.DOB,
                    Blood:found.Blood,
                    Sex:found.Sex,
                    Age:found.Age,
                    phn_no:found.phn_no
                })
                }
                
            }
        })
    }else{
        res.send("<h1>Scan the QR</h1>")
    }
    
})




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
    console.log("server started at 3000");
});

