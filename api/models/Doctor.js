const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  qualification: {
    type: String,
  },
  specialty: {
    type: String,
  },
  photo: {
    type: String,
  },
  specializedTreatments: {
    type: [String],
  },
  professionalBio: {
    type: String,
  },
  consultingLanguages: {
    type: [String], // Array of strings representing languages
  },
  experienceInIndustry: {
    type: Number, // Number of years of experience
  },
  academicDetails: {
    type: String, // String containing academic details
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
