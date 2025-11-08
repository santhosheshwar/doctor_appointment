const userModel = require('../models/userModels');
const appointment = require('../models/appointment');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find({});
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAppointmentId = async (req, res) => {
  try {
    const updated = await appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          scheduledTime: req.body.scheduledTime
        },
        { new: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const requestChangeHandler = async (req, res) => {
  try {
    const appoint = await appointment.findById(req.params.id);
    if (!appoint) {
      return res.status(404).json({ success: false, msg: "Appointment not found" });
    }

    appoint.requestedChange = {
      date: req.body.newDate,
      time: req.body.newTime
    };
    appoint.status = 'change_requested';  // Optional

    await appoint.save();
    res.json({ success: true, msg: "Change request submitted", data: appoint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const handleAcceptChange = async (req, res) => {
  try {
    const appoint = await appointment.findById(req.params.id);
    if (!appoint) return res.status(404).json({ success: false, msg: "Appointment not found" });

    let finalDate = appoint.requestedChange?.date;
    let finalTime = appoint.requestedChange?.time;

    // Admin can override:
    if (req.body.date) finalDate = req.body.date;
    if (req.body.time) finalTime = req.body.time;

    if (!finalDate || !finalTime) {
      return res.status(400).json({ success: false, msg: "No valid requested change found" });
    }

    appoint.scheduledTime = new Date(finalDate);
    appoint.status = 'approved';
    appoint.requestedChange = null;

    await appoint.save();
    res.json({ success: true, msg: "Change accepted", data: appoint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const handleRejectChange = async (req, res) => {
  try {
    const appoint = await appointment.findById(req.params.id);
    if (!appoint) return res.status(404).json({ success: false, msg: "Appointment not found" });

    appoint.requestedChange = null;
    appoint.status = 'approved';

    await appoint.save();
    res.json({ success: true, msg: "Change rejected", data: appoint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getUsers,
  getAppointments,
  getAppointmentId,
  handleAcceptChange,
  handleRejectChange,
  requestChangeHandler
};
