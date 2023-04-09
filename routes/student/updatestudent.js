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
    
   res.render('studentregister',{errorMessage: ""});
    return;
  }
    res.redirect('/studentaq',{message:''});

  });


router.post("/", upload.fields([{ name: "resume", maxCount: 1 }, { name: "offerletter", maxCount: 1 }]), async (req, res) => {
    try {
     
      
      //   user.name = req.body.name;
      //   user.phone = req.body.phone;
      //   user.email = req.body.email;
      //   user.achievements = req.body.achievements;
      //   user.gpa10 = req.body.gpa10;
      //   user.gpa12 = req.body.gpa12;
      //   user.ug1 = req.body.ug1;
      //   user.ug2 = req.body.ug2;
      //   user.ug3 = req.body.ug3;
      //   user.ug4 = req.body.ug4;
      //   user.ug5 = req.body.ug5;
      //   user.ug6 = req.body.ug6;
      //   user.ug7 = req.body.ug7;
      //   user.ug8 = req.body.ug8;
     
        if (req.files["resume"]) {
            //  const resume = req.files["resume"][0].filename;
            //  user.resume=resume;
            req.body.resume=req.files["resume"][0].filename;
         }
         if(req.files["offerletter"]){
             req.body.offerletter = req.files["offerletter"][0].filename;
          
        }
        //  if(req.body.dob){
        //      user.dob = req.body.dob;
        //  }

      // await user.save();
      // res.send("updated");
      console.log(req.body);
      const myquery={username: req.body.username };
      await User.updateOne(myquery,req.body);

      res.send("updated");
     
    } catch (error) {
      console.error(error);
      res.send("<h2>Resume upload failed!</h2>");
    }
  });

  module.exports = router;