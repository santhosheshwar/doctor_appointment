const mongoose = require( "mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  role: {
    type: String,
    enum: ["admin", "user","doctor"],
  }
});

// userSchema.pre("save",async function(next){
//   if(!this.isModified("password")){
//       return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password,salt);
//   next();
// })

const userModel = mongoose.model("users", userSchema);

module.exports = userModel