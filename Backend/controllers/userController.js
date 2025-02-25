// import { asyncHandler } from "../middlewares/asyncHandler.js";
// import ErrorHandler from "../middlewares/error.js";
// import { User } from "../models/userSchema.js";
// import { v2 as cloudinary } from "cloudinary";
// import { generateToken } from "../utils/createToken.js";

// //Register User
// export const registerUser = asyncHandler(async (req, res, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("Please Upload Your Avatar and Resume!", 400));
//   } // Checking if avatar and resume is uploaded

//   const { avatar, resume } = req.files;

//   const resForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {
//     folder: "Avatars",
//   }); // Upload avatar to server.

//   if (!resForAvatar || resForAvatar.error) {
//     console.error(
//       "Error in uploading avatar: ",
//       resForAvatar.error || "Unknown Error"
//     );
//   }

//   const resForResume = await cloudinary.uploader.upload(resume.tempFilePath, {
//     folder: "Resume",
//     resource_type: "raw",
//   }); // Upload resume to server.

//   if (!resForResume || resForResume.error) {
//     console.error(
//       "Error in uploading avatar: ",
//       resForResume.error || "Unknown Error"
//     );
//   }

//   const {
//     fullName,
//     email,
//     phone,
//     aboutMe,
//     password,
//     portfolioURL,
//     githubURL,
//     instagramURL,
//     facebookURL,
//     linkedinURL,
//     twitterURL,
//   } = req.body;

//   // Check if all fields are provided
//   if (
//     !fullName ||
//     !email ||
//     !phone ||
//     !aboutMe ||
//     !password ||
//     !portfolioURL ||
//     !githubURL ||
//     !instagramURL ||
//     !facebookURL ||
//     !linkedinURL ||
//     !twitterURL
//   ) {
//     return next(new ErrorHandler("Please fill all fields", 400));
//   }

//   const user = await User.create({
//     fullName,
//     email,
//     phone,
//     aboutMe,
//     password,
//     avatar: {
//       public_id: resForAvatar.public_id,
//       url: resForAvatar.secure_url,
//     },
//     resume: {
//       public_id: resForResume.public_id,
//       url: resForResume.secure_url,
//     },
//     portfolioURL,
//     githubURL,
//     instagramURL,
//     facebookURL,
//     linkedinURL,
//     twitterURL,
//   });

//   generateToken(user, "User Registered Successfully!", 201, res);
// });

// //Login User
// export const loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please Enter Email & Password!", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await user.comparePassword(password))) {
//     return next(new ErrorHandler("Invalid Email or Password!", 401));
//   }

//   generateToken(user, "User Logged In Successfully!", 200, res);
// });

// //Logout User
// export const logoutUser = asyncHandler(async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "User Logged Out Successfully!",
//   });
// });

// // Get User Profile
// export const getUserProfile = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user._id).select("-password");

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// // Update User Profile
// export const updateUserProfile = asyncHandler(async (req, res, next) => {
//   const updatedUser = {
//     fullName: req.body.fullName,
//     email: req.body.email,
//     phone: req.body.phone,
//     aboutMe: req.body.aboutMe,
//     portfolioURL: req.body.portfolioURL,
//     githubURL: req.body.githubURL,
//     instagramURL: req.body.instagramURL,
//     facebookURL: req.body.facebookURL,
//     linkedinURL: req.body.linkedinURL,
//     twitterURL: req.body.twitterURL,
//   };

//   //Update Avatar
//   if (req.files && req.files.avatar) {
//     const updatedAvatar = req.files.avatar;
//     const user = await User.findById(req.user._id);
//     const avatarId = user.avatar.public_id;
//     await cloudinary.uploader.destroy(avatarId);

//     const resForUpdatedAvatar = await cloudinary.uploader.upload(
//       updatedAvatar.tempFilePath,
//       {
//         folder: "Avatars",
//       }
//     ); // Upload avatar to server.

//     updatedUser.avatar = {
//       public_id: resForUpdatedAvatar.public_id,
//       url: resForUpdatedAvatar.secure_url,
//     };
//   }
//   //Update Resume
//   if (req.files && req.files.resume) {
//     const updatedResume = req.files.resume;
//     const user = await User.findById(req.user._id);
//     const resumeId = user.resume.public_id;
//     await cloudinary.uploader.destroy(resumeId);

//     const resForUpdatedResume = await cloudinary.uploader.upload(
//       updatedResume.tempFilePath,
//       {
//         folder: "Resume",
//       }
//     ); // Upload resume to server.

//     updatedUser.resume = {
//       public_id: resForUpdatedResume.public_id,
//       url: resForUpdatedResume.secure_url,
//     };
//   }

//   const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     message: "User Profile Updated Successfully!",
//     data: user,
//   });
// });

import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { generateToken } from "../utils/createToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Register User
export const registerUser = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.avatar || !req.files.resume) {
    return next(new ErrorHandler("Please Upload Your Avatar and Resume!", 400));
  }

  const avatarPath = req.files.avatar[0].path;
  const resumePath = req.files.resume[0].path;

  // Upload avatar
  const resForAvatar = await cloudinary.uploader.upload(avatarPath, {
    folder: "Avatars",
  });

  if (!resForAvatar || resForAvatar.error) {
    console.error(
      "Error in uploading avatar: ",
      resForAvatar.error || "Unknown Error"
    );
  }

  // Upload resume with resource_type "raw"
  const resForResume = await cloudinary.uploader.upload(resumePath, {
    folder: "Resume",
  });

  if (!resForResume || resForResume.error) {
    console.error(
      "Error in uploading resume: ",
      resForResume.error || "Unknown Error"
    );
  }

  // // Modify resume URL for inline viewing
  // const resumeURL = resForResume.secure_url.replace(
  //   "/upload/",
  //   "/upload/fl_inline/"
  // );

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    linkedinURL,
    twitterURL,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !aboutMe ||
    !password ||
    !portfolioURL ||
    !githubURL ||
    !instagramURL ||
    !facebookURL ||
    !linkedinURL ||
    !twitterURL
  ) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    avatar: {
      public_id: resForAvatar.public_id,
      url: resForAvatar.secure_url,
    },
    resume: {
      public_id: resForResume.public_id,
      url: resForResume.secure_url, // Inline viewing URL
    },
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    linkedinURL,
    twitterURL,
  });

  generateToken(user, "User Registered Successfully!", 201, res);
});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password!", 401));
  }

  generateToken(user, "User Logged In Successfully!", 200, res);
});

// Logout User
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully!",
  });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
    linkedinURL: req.body.linkedinURL,
    twitterURL: req.body.twitterURL,
  };

  // Update Avatar
  if (req.files && req.files.avatar) {
    const updatedAvatar = req.files.avatar[0].path;
    const user = await User.findById(req.user._id);
    const avatarId = user.avatar.public_id;
    await cloudinary.uploader.destroy(avatarId);

    const resForUpdatedAvatar = await cloudinary.uploader.upload(
      updatedAvatar,
      {
        folder: "Avatars",
      }
    );

    updatedUser.avatar = {
      public_id: resForUpdatedAvatar.public_id,
      url: resForUpdatedAvatar.secure_url,
    };
  }

  // Update Resume
  if (req.files && req.files.resume) {
    const updatedResume = req.files.resume[0].path;
    const user = await User.findById(req.user._id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);

    const resForUpdatedResume = await cloudinary.uploader.upload(
      updatedResume,
      {
        folder: "Resume",
      }
    );

    // // Modify URL for inline viewing
    // const updatedResumeURL = resForUpdatedResume.secure_url.replace(
    //   "/upload/",
    //   "/upload/fl_inline/"
    // );

    updatedUser.resume = {
      public_id: resForUpdatedResume.public_id,
      url: resForUpdatedResume.secure_url, // Inline viewing URL
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User Profile Updated Successfully!",
    data: user,
  });
});

//Update password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currntPassword, newPassword, confirmPassword } = req.body;

  if (!currntPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatched = await user.comparePassword(currntPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Current Password!", 401));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }
  if (newPassword === currntPassword) {
    return next(
      new ErrorHandler("New Password cannot be same as Current Password!", 400)
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated Successfully!",
  });
});

//Get Portfolio
export const getPortfolio = asyncHandler(async (req, res, next) => {
  const id = "678a25d42ef457cdf9f42bf0";
  const user = await User.findById(id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});

//FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If 
  You've not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);
});
