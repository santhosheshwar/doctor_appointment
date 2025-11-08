const Appointment = require('../models/appointment');

const createAppointment = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);

    const appointment = new Appointment({
      ...req.body,
      userId: req.user ? req.user._id : undefined
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctor appointments', error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json({msg:"documents retrived successfully",appointments});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};
// Example Express route for filtering by userId
// const getAppointments = async (req, res) => {
//   const userId = req.query.userId;
//
//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required" });
//   }

//   const appointments = await Appointment.find({ userId });
//   res.json({ appointments });
// };




// exports.getAppointmentById = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching appointment', error });
//   }
// };

// exports.updateAppointment = async (req, res) => {try {
//     const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating appointment', error });
//   }
// };

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
module.exports = {createAppointment,getAppointments,deleteAppointment,getDoctorAppointments}