import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "../utils/cloudinary.js";
import { Research } from "../models/researchSchema.js";

export const addResearch = asyncHandler(async (req, res, next) => {
  const { title, description, paperId, platform, program, status } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Title and Description are required", 400));
  }

  let paperAttachment,
    codeAttachment,
    images = [];

  // Paper upload (PDF)
  if (req.files?.paper) {
    const paperRes = await cloudinary.uploader.upload(req.files.paper[0].path, {
      folder: "Research/Papers",
      resource_type: "raw",
    });
    paperAttachment = {
      public_id: paperRes.public_id,
      url: paperRes.secure_url,
    };
  }

  // Code upload
  if (req.files?.code) {
    const codeRes = await cloudinary.uploader.upload(req.files.code[0].path, {
      folder: "Research/Code",
      resource_type: "raw",
    });
    codeAttachment = {
      public_id: codeRes.public_id,
      url: codeRes.secure_url,
      fileType: req.files.code[0].originalname.split(".").pop(),
    };
  }

  // Images upload
  if (req.files?.images) {
    for (const img of req.files.images) {
      const imgRes = await cloudinary.uploader.upload(img.path, {
        folder: "Research/Images",
      });
      images.push({
        public_id: imgRes.public_id,
        url: imgRes.secure_url,
      });
    }
  }

  const research = await Research.create({
    title,
    description,
    paperId,
    platform,
    program,
    status,
    paperAttachment,
    codeAttachment,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Research added successfully",
    research,
  });
});

export const getAllResearch = asyncHandler(async (req, res) => {
  const research = await Research.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, research });
});

export const getSingleResearch = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id);
  if (!research) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  res.status(200).json({ success: true, research });
});

export const deleteResearch = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id);
  if (!research) {
    return res.status(404).json({ success: false });
  }

  if (research.paperAttachment?.public_id) {
    await cloudinary.uploader.destroy(research.paperAttachment.public_id, {
      resource_type: "raw",
    });
  }

  if (research.codeAttachment?.public_id) {
    await cloudinary.uploader.destroy(research.codeAttachment.public_id, {
      resource_type: "raw",
    });
  }

  for (const img of research.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await research.deleteOne();

  res.status(200).json({
    success: true,
    message: "Research deleted",
  });
});
