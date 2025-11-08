const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  doctorname: { type: String },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: false,
  },
  scheduledTime: {
    type: Date,
    default: null
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'change_requested'],
    default: 'pending',
  },

  requestedChange: {
    date: Date,
    time: String,
  },

  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
