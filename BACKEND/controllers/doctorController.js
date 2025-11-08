const doctormodel = require("../models/doctor");
const AppointmentModel = require("../models/appointment");
const getdoctors = async (req, res) => {
  try {
    const doctors = await doctormodel.find({});
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
const postdoctors = async(req,res)=>{
    try{
        const doctor = new doctormodel(req.body);
        await doctor.save();
        res.status(200).json({success:true,doctor});
    } catch(error){
            res.status(500).json({success:false,message:error});
    }
}
const Respond = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({ doctorId: req.user.id });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Unable to fetch appointments" });
  }
};

const appointments = async (req, res) => {
  try {
    const { id, status, preferredTime } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: "Appointment ID and status are required" });
    }

    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      { status, preferredTime },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Updated Successfully", updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Unable to update appointment" });
  }
};
module.exports = { getdoctors ,postdoctors , Respond, appointments };