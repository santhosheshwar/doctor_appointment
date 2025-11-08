const mongoose = require('mongoose');

const admin = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String},
  address: { type: String },
  phoneNumber: { type: String},
  doctorname:{ type:String },
  status:{
    type:String,
    enum:['pending','approved','rejected'],
    default:'pending'
  },
  scheduledTime:{type:String},
  enquirynumber:{type:Number}
});

const admins = mongoose.model("AppointmentApproval", admin);
module.exports = admins