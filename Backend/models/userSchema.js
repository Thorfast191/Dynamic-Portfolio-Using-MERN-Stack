import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please Enter Your Full Name!"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email!"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number!"],
  },
  aboutMe: {
    type: String,
    required: [true, "Please Enter Something About You!"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password!"],
    minlength: [8, "Password must be at least 8 characters!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Please Enter Your Portfolio URL!"],
  },
  githubURL: String,
  instagramURL: String,
  facebookURL: String,
  linkedinURL: String,
  twitterURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting Password Before Saving User
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } //Checks If password is changed
  this.password = await bcrypt.hash(this.password, 10); //If password is changed, then hash the password.
});

//Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating JSON web token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//Generating reset password token//Generating Reset Password Token
//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
