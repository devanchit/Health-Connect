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

  app.post('/signin', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if(userDoc){
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            username,
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


  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });


  app.listen(4000);

  // db user:
//username : devanshchitransh
//password:   KBiNQfcRCuWNfoPe

// mongodb+srv://devanshchitransh:<password>@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority