const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

const loginController = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.role !== role) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }


    const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
          token: JWT_SECRET,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      name: user.name,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};
const getusers = async (req, res) => {
    const { email } = req.body;

    try {
        const users = await userModel.find({ email });

        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).json({ success: false, message: "No user found with that email" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {loginController,registerController,getusers}
