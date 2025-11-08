const express = require("express");
const {registerController,loginController, getusers} = require("../controllers/userCtrl");
const router = express.Router();
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getuser",getusers)
module.exports = router;