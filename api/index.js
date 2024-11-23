const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "asdfe45we45w345wegw345werjktjwadsdertkj";
const salt = bcrypt.genSaltSync(10);
const { authPage } = require("./middlewares");
const Doctor = require("./models/Doctor");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

app.post("/admin", authPage(["admin", "admin2"]), async (req, res) => {
  const { username } = req.body;
  //console.log(username);
  try {
    const doctors = await Doctor.find({}, "-password"); // Exclude the password field
    console.log(doctors);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    console.log(userDoc);
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      console.log("login..........  " + passOk);
      if (passOk) {
        // logged in
        jwt.sign(
          { username, id: userDoc._id, role: userDoc.role },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: userDoc._id,
              username,
              role: userDoc.role,
            });
          }
        );
      } else {
        res.status(400).json("wrong credentials");
      }
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    console.error("Error during findOne:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/profile", async (req, res) => {
//   const { token } = req.cookies;
//   console.log(token)
//   const { username, doctorName} = req.body;
//   console.log(doctorName + "  yhi h...")
//   if (!token) {
//     return res.status(401).json({ error: "JWT must be provided" });
//   }
//   jwt.verify(token, secret, {}, (err, info) => {
//     if (err) throw err;
//     const { role } = token;
//     res.json(info);
//   });
// });


app.get("/profile", async (req, res) => {
  console.log("Cookies received:", req.cookies);

  const { token } = req.cookies; // Ensure cookie-parser is used
  if (!token) {
    return res.status(401).json({ error: "JWT must be provided" });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(403).json({ error: "Invalid token" });
    }
    res.json(info);
  });
});


app.get("/patients", async (req, res) => {
  try {
    const patients = await User.find({}, "-password"); // Exclude the password field
    //console.log(patients)
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  console.log("logout Done.........");
  res.status(200).cookie("token", "").json({ message: "Logout successful" });
});


app.post("/addDoctors", async function (req, res) {
  // console.log(req.body);
  const { doctorName, email, specialty, Password } = req.body;
  console.log(doctorName);
  console.log(email);
  console.log(Password);
  //const prevData = req.body;

  try {
    const userDoc = await Doctor.create({
      ...req.body,
      password: bcrypt.hashSync(Password, salt),
      username: doctorName,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "-password"); // Exclude the password field
    //console.log(doctors);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/doctorsList", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "doctorName name"); // Select only the username and name fields

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/doctorsignin", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("username : " + username + "password: " + "  " + password);
//   // Check if the username and password are valid (you may want to hash passwords in a real app)
//   const user = await Doctor.findOne({ doctorName: username });

//   if (user) {
//     const passOk = bcrypt.compareSync(password, user.password);
//     // User found, respond with user data
//     jwt.sign(
//       { username, id: user._id, role: user.role },
//       secret,
//       {},
//       (err, token) => {
//         if (err) throw err;
//         res.cookie("token", token).json({
//           id: user._id,
//           username,
//           role: user.role,
//         });
//       }
//     );
//   } else {
//     // User not found, respond with an error
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// });


app.post("/doctorsignin", async (req, res) => {
  const { username, password } = req.body;
  // console.log("username : " + username + "    password: " + "  " + password);
  try {
    const userDoc = await Doctor.findOne({ doctorName: username });
    console.log(userDoc);
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      console.log("login..........  " + passOk);
      if (passOk) {
        // logged in
        jwt.sign(
          { username: userDoc.doctorName, id: userDoc._id, role: userDoc.role },
          secret,
          {},
          (err, token) => {
            if (err) throw err;
            console.log("Generated token:", token); 
            res.cookie("token", token).json({
              id: userDoc._id,
              username: userDoc.doctorName,
              role: userDoc.role,
            });
            
          }
        );
        console.log("doctor name->    "+userDoc.doctorName);
      } else {
        res.status(400).json("wrong credentials");
      }
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    console.error("Error during findOne:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

app.listen(4000);

// db user:
//username : devanshchitransh
//password:   KBiNQfcRCuWNfoPe

// mongodb+srv://devanshchitransh:<password>@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority
