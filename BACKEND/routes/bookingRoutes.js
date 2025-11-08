const express = require("express");
const router = express.Router();
const {createAppointment, getAppointments, deleteAppointment, getDoctorAppointments} = require("../controllers/appointmentsController")
const auth = require("../auth/auth");

router.post("/book",auth,createAppointment);
router.get("/showbookings",getAppointments);
// router.post("/deletebooking",deleteAppointment);
router.get("/doctor/:doctorId",getDoctorAppointments);
module.exports = router