import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../models/skillSchema.js";
import cloudinary from "../utils/cloudinary.js";

export const addSkill = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.svg) {
    return next(new ErrorHandler("Please Upload Your SVG File!", 400));
  }

  const svgPath = req.files.svg[0].path;

  // Upload avatar
  const resForSvg = await cloudinary.uploader.upload(svgPath, {
    folder: "svg",
  });

  if (!resForSvg || resForSvg.error) {
    console.error(
      "Error in uploading avatar: ",
      resForSvg.error || "Unknown Error"
    );
  }

  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return next(new ErrorHandler("Please provide title and proficiency!", 400));
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: resForSvg.public_id,
      url: resForSvg.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    skill,
  });
});

export const updateSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  if (req.files && req.files.svg) {
    const svgPath = req.files.svg[0].path;
    const resForSvg = await cloudinary.uploader.upload(svgPath, {
      folder: "svg",
    });
    if (!resForSvg || resForSvg.error) {
      console.error(
        "Error in uploading skill: ",
        resForSvg.error || "Unknown Error"
      );
    }
    skill.svg = {
      public_id: resForSvg.public_id,
      url: resForSvg.secure_url,
    };
  }

  const { proficiency } = req.body;

  if (proficiency) {
    skill.proficiency = proficiency;
  }

  await skill.save();
  res.status(200).json({
    success: true,
    skill,
  });
});

export const deleteSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Software Application not found!", 404));
  }

  // Use the svg field which contains the Cloudinary public id.
  const skillSvgId = skill.svg;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });
});

export const getSkills = asyncHandler(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({ success: true, skills });
});
