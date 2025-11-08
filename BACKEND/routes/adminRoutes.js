const express = require('express');
const { getUsers, getAppointments, getAppointmentId, handleAcceptChange, handleRejectChange, requestChangeHandler} = require('../controllers/admin');
const auth = require("../auth/auth");
const router = express.Router();

router.get('/users',getUsers);
router.get('/getappointments',getAppointments);
router.post('/appointment/:id',getAppointmentId);
router.post('/appointment/:id/accept-change',auth,handleAcceptChange);
router.post('/appointment/:id/reject-change',auth,handleRejectChange);
router.post('/appointment/:id/request-change', auth, requestChangeHandler);

module.exports = router