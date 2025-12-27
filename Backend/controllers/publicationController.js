import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Publication } from "../models/publicationSchema.js";
import cloudinary from "../utils/cloudinary.js";

// ADD NEW PUBLICATION
export const addNewPublication = asyncHandler(async (req, res, next) => {
  const { title, description, paperId, platform, program, status } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Title and Description are required!", 400));
  }

  // Create publication data object
  const publicationData = {
    title,
    description,
    paperId: paperId || "",
    platform: platform || "",
    program: program || "",
    status: status || "Ongoing",
  };

  // Handle paper attachment
  if (req.files && req.files.publication) {
    const publicationFile = req.files.publication[0];
    const resForPublication = await cloudinary.uploader.upload(
      publicationFile.path,
      {
        folder: "Publications",
        resource_type: "raw",
      }
    );
    publicationData.paperAttachment = {
      public_id: resForPublication.public_id,
      url: resForPublication.secure_url,
      name: publicationFile.originalname,
    };
  }

  // Handle code attachment (note: update multer config to accept 'codeAttachment')
  if (req.files && req.files.codeAttachment) {
    const codeFile = req.files.codeAttachment[0];
    const resForCode = await cloudinary.uploader.upload(codeFile.path, {
      folder: "Publications/Code",
      resource_type: "raw",
    });
    publicationData.codeAttachment = {
      public_id: resForCode.public_id,
      url: resForCode.secure_url,
      name: codeFile.originalname,
    };
  }

  // Handle images (note: update multer config to accept 'images')
  if (req.files && req.files.images) {
    const imageUploadPromises = req.files.images.map(async (image) => {
      const resForImage = await cloudinary.uploader.upload(image.path, {
        folder: "Publications/Images",
      });
      return {
        public_id: resForImage.public_id,
        url: resForImage.secure_url,
        name: image.originalname,
      };
    });
    publicationData.images = await Promise.all(imageUploadPromises);
  }

  const publication = await Publication.create(publicationData);

  res.status(201).json({
    success: true,
    message: "Publication added successfully",
    publication,
  });
});

// UPDATE PUBLICATION
export const updatePublication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const publication = await Publication.findById(id);
  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  // Handle paper attachment update
  if (req.files && req.files.publication) {
    // Delete old file if exists
    if (publication.paperAttachment && publication.paperAttachment.public_id) {
      await cloudinary.uploader.destroy(publication.paperAttachment.public_id, {
        resource_type: "raw",
      });
    }

    const publicationFile = req.files.publication[0];
    const resForPublication = await cloudinary.uploader.upload(
      publicationFile.path,
      {
        folder: "Publications",
        resource_type: "raw",
      }
    );
    publication.paperAttachment = {
      public_id: resForPublication.public_id,
      url: resForPublication.secure_url,
      name: publicationFile.originalname,
    };
  }

  // Handle code attachment update
  if (req.files && req.files.codeAttachment) {
    // Delete old file if exists
    if (publication.codeAttachment && publication.codeAttachment.public_id) {
      await cloudinary.uploader.destroy(publication.codeAttachment.public_id, {
        resource_type: "raw",
      });
    }

    const codeFile = req.files.codeAttachment[0];
    const resForCode = await cloudinary.uploader.upload(codeFile.path, {
      folder: "Publications/Code",
      resource_type: "raw",
    });
    publication.codeAttachment = {
      public_id: resForCode.public_id,
      url: resForCode.secure_url,
      name: codeFile.originalname,
    };
  }

  // Handle images update (append new images)
  if (req.files && req.files.images) {
    const imageUploadPromises = req.files.images.map(async (image) => {
      const resForImage = await cloudinary.uploader.upload(image.path, {
        folder: "Publications/Images",
      });
      return {
        public_id: resForImage.public_id,
        url: resForImage.secure_url,
        name: image.originalname,
      };
    });
    const newImages = await Promise.all(imageUploadPromises);
    publication.images = [...publication.images, ...newImages];
  }

  // Update text fields
  const { title, description, paperId, platform, program, status } = req.body;

  if (title) publication.title = title;
  if (description) publication.description = description;
  if (paperId !== undefined) publication.paperId = paperId;
  if (platform !== undefined) publication.platform = platform;
  if (program !== undefined) publication.program = program;
  if (status !== undefined) publication.status = status;

  await publication.save();

  res.status(200).json({
    success: true,
    message: "Publication updated successfully",
    publication,
  });
});

// DELETE PUBLICATION
export const deletePublication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const publication = await Publication.findById(id);
  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  // Delete paper attachment from Cloudinary
  if (publication.paperAttachment && publication.paperAttachment.public_id) {
    await cloudinary.uploader.destroy(publication.paperAttachment.public_id, {
      resource_type: "raw",
    });
  }

  // Delete code attachment from Cloudinary
  if (publication.codeAttachment && publication.codeAttachment.public_id) {
    await cloudinary.uploader.destroy(publication.codeAttachment.public_id, {
      resource_type: "raw",
    });
  }

  // Delete all images from Cloudinary
  if (publication.images && publication.images.length > 0) {
    const deletePromises = publication.images.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );
    await Promise.all(deletePromises);
  }

  await publication.deleteOne();

  res.status(200).json({
    success: true,
    message: "Publication deleted successfully",
  });
});

// GET SINGLE PUBLICATION
export const getSinglePublication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const publication = await Publication.findById(id);
    if (!publication) {
      return next(new ErrorHandler("Publication not found!", 404));
    }
    res.status(200).json({
      success: true,
      publication,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// GET ALL PUBLICATIONS
export const getAllPublications = asyncHandler(async (req, res, next) => {
  const publications = await Publication.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    publications,
  });
});

// REMOVE IMAGE FROM PUBLICATION
export const removeImageFromPublication = asyncHandler(
  async (req, res, next) => {
    const { id, imageId } = req.params;
    const publication = await Publication.findById(id);
    if (!publication) {
      return next(new ErrorHandler("Publication not found!", 404));
    }

    const imageIndex = publication.images.findIndex(
      (img) => img._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return next(new ErrorHandler("Image not found!", 404));
    }

    const imageToRemove = publication.images[imageIndex];

    // Delete from Cloudinary
    if (imageToRemove.public_id) {
      await cloudinary.uploader.destroy(imageToRemove.public_id);
    }

    // Remove from array
    publication.images.splice(imageIndex, 1);
    await publication.save();

    res.status(200).json({
      success: true,
      message: "Image removed successfully",
      publication,
    });
  }
);
