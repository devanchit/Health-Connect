const express = require('express');
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const secret = 'asdfe45we45w345wegw345werjktjwadsdertkj';
const salt = bcrypt.genSaltSync(10);
const {authPage} = require('./middlewares');
const Doctor = require('./models/Doctor');

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://devanshchitransh:KBiNQfcRCuWNfoPe@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority");



app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
        email,
      });
      res.json(userDoc);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  app.post('/admin', authPage(["admin","admin2"]), async(req, res) => {
    const {username} = req.body;
      //console.log(username);
      try {
        const doctors = await Doctor.find({}, '-password'); // Exclude the password field
        console.log(doctors)
        res.json(doctors);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
  });

  app.post('/signin', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if(userDoc){
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id,role:userDoc.role}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            username,
            role: userDoc.role,
          });
        });
      } else {
        res.status(400).json('wrong credentials');
      }
    }
    else {
      res.status(400).json('user not found');
    }
  });


  app.get('/profile', async(req,res) => {
    const {token} = req.cookies;
    const {username} = req.body;
    //console.log("username:" +  username)
    //const userDoc = await User.findOne({username});
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      const {role} = token;

     // console.log("role:  " + role)
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

  // doctorName: "",
  // firstname: "",
  // email: "",
  // name: "",
  // password: "",
  // qualification: "",
  // specialty: "",
  // photo: "",
  // specializedTreatments: [],
  // professionalBio: "",
  // consultingLanguages: [],
  // experienceInIndustry: 0,


  app.post('/addDoctors', async function(req, res){
   // console.log(req.body);
    const { doctorName, email, specialty, Password } = req.body;
    console.log(doctorName);
    console.log(email);
    console.log(Password);
    //const prevData = req.body;

    try{
      const userDoc = await Doctor.create({
        ...req.body,
        password: bcrypt.hashSync(Password, salt),
      });
      res.json(userDoc);

    }
    catch(e){
      console.log(e);
      res.status(400).json(e);
    }
    
 });

 app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, '-password'); // Exclude the password field
    console.log(doctors)
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  app.listen(4000);

  // db user:
//username : devanshchitransh
//password:   KBiNQfcRCuWNfoPe

// mongodb+srv://devanshchitransh:<password>@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority