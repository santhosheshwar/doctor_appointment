const express = require("express");
const { getdoctors , postdoctors, Respond, appointments } = require("../controllers/doctorController");
const router = express.Router();
router.get("/", getdoctors);
router.post("/add-doctors", postdoctors);
router.post("/doctor/respond",Respond);
router.get("/doctor/appointments",appointments)
module.exports = router;