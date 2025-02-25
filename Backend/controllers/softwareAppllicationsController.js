//

import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplications } from "../models/softwareApplicationschema.js";
import cloudinary from "../utils/cloudinary.js";

export const addSoftApplications = asyncHandler(async (req, res, next) => {
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

  const name = req.body.name;

  if (!name) {
    return next(
      new ErrorHandler(
        "Please provide the name of the software application!",
        400
      )
    );
  }

  const softwareApplication = await SoftwareApplications.create({
    name,
    svg: {
      public_id: resForSvg.public_id,
      url: resForSvg.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    softwareApplication,
  });
});

export const deleteSoftApplications = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const softwareApplication = await SoftwareApplications.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application not found!", 404));
  }

  // Use the svg field which contains the Cloudinary public id.
  const softwareApplicationSvgId = softwareApplication.svg;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  await softwareApplication.deleteOne();

  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });
});

export const getSoftApplications = asyncHandler(async (req, res, next) => {
  const softwareApplications = await SoftwareApplications.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});
