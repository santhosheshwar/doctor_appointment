const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  title: { type: String, required: true },
  experience: { type: String, required: true },
  languages: { type: String, required: true },
  location: { type: String, required: true },
  fees: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  KnowYourDoctor: { type: String, required: true }
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = DoctorModel;
