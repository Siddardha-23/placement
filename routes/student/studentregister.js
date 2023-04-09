const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require("multer");
var cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


  const { User } = require('../../models/registermodel'); 



const router = express.Router();
app.set('view engine', 'ejs');


router.get('/',(req,res)=>{
    const myCookie = req.cookies.user;

    if (!myCookie) {
      const pccookie =req.cookies.pc;
      const tpocookie=req.cookies.tpo;
      if(!pccookie&&!tpocookie)
      {
          res.render('studentregister',{errorMessage:""});
          return;
      }
      else{
        res.send("switch to student account");
      }
    }  
    res.redirect('/studentaq');

  });


router.post("/", upload.fields([{ name: "resume", maxCount: 1 }, { name: "offerletter", maxCount: 1 }]), async (req, res) => {
    try {
      const test = await User.findOne({ username: req.body.username });
      if (test) {
        var temp = req.body.username.concat("  Registration number already exists");
        res.render("studentregister",{errorMessage:temp});
       return;
        }
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const email = req.body.email;
        const course = req.body.course;
        const branch = req.body.branch;
        const dob = req.body.dob;
        const achievements = req.body.achievements;
        const gpa10 = req.body.gpa10;
        const gpa12 = req.body.gpa12;
        const ug1 = req.body.ug1;
        const ug2 = req.body.ug2;
        const ug3 = req.body.ug3;
        const ug4 = req.body.ug4;
        const ug5 = req.body.ug5;
        const ug6 = req.body.ug6;
        const ug7 = req.body.ug7;
        const ug8 = req.body.ug8;
        const backlogs = req.body.backlogs;
     
      console.log(req.body);

    var resume="";
    var offerletter="";
   if(req.files["resume"][0].filename){
     resume = req.files["resume"][0].filename;
   }
      
   if(req.files["offerletter"][0].filename){
    offerletter = req.files["offerletter"][0].filename;
   }
     
   
  
      const user = new User({ name,username,gender,password,phone,email,course,branch,dob,achievements,gpa10,gpa12,ug1,ug2,ug3,ug4,ug5,ug6,ug7,ug8,backlogs,resume, offerletter });
      await user.save();
      res.clearCookie('pc');
      res.clearCookie('tpo');
      res.cookie('user', user.username);
 
      res.redirect('/use-cookie');
     
    } catch (error) {
      console.error(error);
      res.send("<h2>Resume upload failed!</h2>");
    }
  });

  module.exports = router;