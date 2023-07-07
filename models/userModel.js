const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const saltRounds = 12;
userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
