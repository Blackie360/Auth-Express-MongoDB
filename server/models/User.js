import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please enter your email address."],
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      miniLength: [8, "Password shuld be of 8 characters"],
      select: false,
    },
    // confirmPassword: {
    //   type: String,
    //   require: [true, "Please confirm your password"],
    //   select: false,
    // },
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const User = mongoose.model("User", userSchema);

export default User;