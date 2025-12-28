import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Publication } from "../models/publicationSchema.js";
import cloudinary from "../utils/cloudinary.js";

// ADD NEW PUBLICATION
export const addNewPublication = asyncHandler(async (req, res, next) => {
  console.log("=== ADD PUBLICATION REQUEST ===");
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);
  console.log("Request headers content-type:", req.headers["content-type"]);

  const { title, description, paperId, platform, program, status } = req.body;

  // Debug: Check for "undefined" strings from frontend
  console.log("Title from request:", title);
  console.log("Description from request:", description);
  console.log("Title type:", typeof title);
  console.log("Description type:", typeof description);

  // Check for required fields - fix for string "undefined" issue
  if (!title || title.trim() === "" || title === "undefined") {
    console.error("Title is invalid:", title);
    return next(
      new ErrorHandler(
        "Title is required and cannot be empty or 'undefined'",
        400
      )
    );
  }

  if (
    !description ||
    description.trim() === "" ||
    description === "undefined"
  ) {
    console.error("Description is invalid:", description);
    return next(
      new ErrorHandler(
        "Description is required and cannot be empty or 'undefined'",
        400
      )
    );
  }

  // Clean up the title and description to remove any "undefined" strings
  const cleanTitle = title === "undefined" ? "" : title.trim();
  const cleanDescription =
    description === "undefined" ? "" : description.trim();

  // Create publication data object with cleaned data
  const publicationData = {
    title: cleanTitle || "Untitled Publication",
    description: cleanDescription || "No description provided",
    paperId: paperId && paperId !== "undefined" ? paperId.trim() : "",
    platform: platform && platform !== "undefined" ? platform.trim() : "",
    program: program && program !== "undefined" ? program.trim() : "",
    status: status && status !== "undefined" ? status : "Ongoing",
  };

  console.log("Cleaned publication data:", publicationData);

  // Handle paper attachment - using req.files.publication (from Multer config)
  if (req.files && req.files.publication) {
    console.log("Processing paper attachment...");
    console.log("Publication file details:", req.files.publication[0]);

    const publicationFile = req.files.publication[0];

    try {
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
      console.log(
        "Paper uploaded to Cloudinary:",
        publicationData.paperAttachment
      );
    } catch (uploadError) {
      console.error("Error uploading paper to Cloudinary:", uploadError);
      return next(new ErrorHandler("Failed to upload paper attachment", 500));
    }
  } else {
    console.log("No paper attachment provided");
  }

  // Handle code attachment
  if (req.files && req.files.codeAttachment) {
    console.log("Processing code attachment...");
    console.log("Code file details:", req.files.codeAttachment[0]);

    const codeFile = req.files.codeAttachment[0];

    try {
      const resForCode = await cloudinary.uploader.upload(codeFile.path, {
        folder: "Publications/Code",
        resource_type: "raw",
      });

      publicationData.codeAttachment = {
        public_id: resForCode.public_id,
        url: resForCode.secure_url,
        name: codeFile.originalname,
      };
      console.log(
        "Code uploaded to Cloudinary:",
        publicationData.codeAttachment
      );
    } catch (uploadError) {
      console.error("Error uploading code to Cloudinary:", uploadError);
      // Don't fail the whole request, just log the error
    }
  } else {
    console.log("No code attachment provided");
  }

  // Handle images
  if (req.files && req.files.images) {
    console.log("Processing images...");
    console.log("Number of images:", req.files.images.length);

    const imageFiles = req.files.images;

    try {
      const imageUploadPromises = imageFiles.map(async (image, index) => {
        console.log(`Uploading image ${index + 1}: ${image.originalname}`);
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
      console.log("Total images uploaded:", publicationData.images.length);
    } catch (uploadError) {
      console.error("Error uploading images to Cloudinary:", uploadError);
      // Don't fail the whole request
    }
  } else {
    console.log("No images provided");
  }

  // Create publication in database
  try {
    console.log("Creating publication in database...");
    const publication = await Publication.create(publicationData);
    console.log("Publication created successfully:", {
      id: publication._id,
      title: publication.title,
      description: publication.description,
    });

    res.status(201).json({
      success: true,
      message: "Publication added successfully",
      publication,
    });
  } catch (dbError) {
    console.error("Database error:", dbError);
    return next(
      new ErrorHandler("Failed to save publication to database", 500)
    );
  }
});

// UPDATE PUBLICATION
export const updatePublication = asyncHandler(async (req, res, next) => {
  console.log("=== UPDATE PUBLICATION REQUEST ===");
  console.log("Publication ID:", req.params.id);
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);

  const { id } = req.params;
  const publication = await Publication.findById(id);

  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  console.log("Found publication to update:", {
    id: publication._id,
    title: publication.title,
  });

  // Handle paper attachment update
  if (req.files && req.files.publication) {
    console.log("Updating paper attachment...");

    // Delete old file if exists
    if (publication.paperAttachment && publication.paperAttachment.public_id) {
      try {
        await cloudinary.uploader.destroy(
          publication.paperAttachment.public_id,
          {
            resource_type: "raw",
          }
        );
        console.log("Old paper deleted from Cloudinary");
      } catch (deleteError) {
        console.error("Error deleting old paper:", deleteError);
      }
    }

    const publicationFile = req.files.publication[0];
    try {
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
      console.log("New paper uploaded to Cloudinary");
    } catch (uploadError) {
      console.error("Error uploading new paper:", uploadError);
      return next(new ErrorHandler("Failed to upload paper attachment", 500));
    }
  }

  // Handle code attachment update
  if (req.files && req.files.codeAttachment) {
    console.log("Updating code attachment...");

    // Delete old file if exists
    if (publication.codeAttachment && publication.codeAttachment.public_id) {
      try {
        await cloudinary.uploader.destroy(
          publication.codeAttachment.public_id,
          {
            resource_type: "raw",
          }
        );
        console.log("Old code deleted from Cloudinary");
      } catch (deleteError) {
        console.error("Error deleting old code:", deleteError);
      }
    }

    const codeFile = req.files.codeAttachment[0];
    try {
      const resForCode = await cloudinary.uploader.upload(codeFile.path, {
        folder: "Publications/Code",
        resource_type: "raw",
      });
      publication.codeAttachment = {
        public_id: resForCode.public_id,
        url: resForCode.secure_url,
        name: codeFile.originalname,
      };
      console.log("New code uploaded to Cloudinary");
    } catch (uploadError) {
      console.error("Error uploading new code:", uploadError);
    }
  }

  // Handle images update (append new images)
  if (req.files && req.files.images) {
    console.log("Adding new images...");
    const imageFiles = req.files.images;

    try {
      const imageUploadPromises = imageFiles.map(async (image) => {
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
      // Ensure publication.images is an array
      if (!Array.isArray(publication.images)) {
        publication.images = [];
      }
      publication.images = [...publication.images, ...newImages];
      console.log("Added", newImages.length, "new images");
    } catch (uploadError) {
      console.error("Error uploading new images:", uploadError);
    }
  }

  // Update text fields with validation
  const { title, description, paperId, platform, program, status } = req.body;

  // Clean and update title if provided and not "undefined"
  if (title !== undefined && title !== "undefined") {
    const cleanTitle = title.trim();
    if (cleanTitle !== "") {
      publication.title = cleanTitle;
      console.log("Updated title:", publication.title);
    }
  }

  // Clean and update description if provided and not "undefined"
  if (description !== undefined && description !== "undefined") {
    const cleanDescription = description.trim();
    if (cleanDescription !== "") {
      publication.description = cleanDescription;
      console.log("Updated description:", publication.description);
    }
  }

  // Update other fields if provided
  if (paperId !== undefined) {
    const cleanPaperId = paperId === "undefined" ? "" : paperId.trim();
    publication.paperId = cleanPaperId;
  }

  if (platform !== undefined) {
    const cleanPlatform = platform === "undefined" ? "" : platform.trim();
    publication.platform = cleanPlatform;
  }

  if (program !== undefined) {
    const cleanProgram = program === "undefined" ? "" : program.trim();
    publication.program = cleanProgram;
  }

  if (status !== undefined && status !== "undefined") {
    publication.status = status;
  }

  // Save updated publication
  try {
    await publication.save();
    console.log("Publication updated successfully");

    res.status(200).json({
      success: true,
      message: "Publication updated successfully",
      publication,
    });
  } catch (dbError) {
    console.error("Database update error:", dbError);
    return next(new ErrorHandler("Failed to update publication", 500));
  }
});

// DELETE PUBLICATION
export const deletePublication = asyncHandler(async (req, res, next) => {
  console.log("=== DELETE PUBLICATION REQUEST ===");
  console.log("Publication ID:", req.params.id);

  const { id } = req.params;
  const publication = await Publication.findById(id);

  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  console.log("Found publication to delete:", {
    id: publication._id,
    title: publication.title,
  });

  // Delete paper attachment from Cloudinary
  if (publication.paperAttachment && publication.paperAttachment.public_id) {
    try {
      await cloudinary.uploader.destroy(publication.paperAttachment.public_id, {
        resource_type: "raw",
      });
      console.log("Paper deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting paper from Cloudinary:", error);
    }
  }

  // Delete code attachment from Cloudinary
  if (publication.codeAttachment && publication.codeAttachment.public_id) {
    try {
      await cloudinary.uploader.destroy(publication.codeAttachment.public_id, {
        resource_type: "raw",
      });
      console.log("Code deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting code from Cloudinary:", error);
    }
  }

  // Delete all images from Cloudinary
  if (publication.images && publication.images.length > 0) {
    console.log(
      "Deleting",
      publication.images.length,
      "images from Cloudinary"
    );

    try {
      const deletePromises = publication.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );
      await Promise.all(deletePromises);
      console.log("All images deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }
  }

  // Delete from database
  try {
    await publication.deleteOne();
    console.log("Publication deleted from database");

    res.status(200).json({
      success: true,
      message: "Publication deleted successfully",
    });
  } catch (dbError) {
    console.error("Database deletion error:", dbError);
    return next(new ErrorHandler("Failed to delete publication", 500));
  }
});

// GET SINGLE PUBLICATION
export const getSinglePublication = asyncHandler(async (req, res, next) => {
  console.log("=== GET SINGLE PUBLICATION REQUEST ===");
  console.log("Publication ID:", req.params.id);

  const { id } = req.params;

  try {
    const publication = await Publication.findById(id);

    if (!publication) {
      return next(new ErrorHandler("Publication not found!", 404));
    }

    console.log("Found publication:", {
      id: publication._id,
      title: publication.title,
      hasPaperAttachment: !!publication.paperAttachment,
      hasCodeAttachment: !!publication.codeAttachment,
      imagesCount: publication.images?.length || 0,
    });

    res.status(200).json({
      success: true,
      publication,
    });
  } catch (error) {
    console.error("Error fetching publication:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// GET ALL PUBLICATIONS
export const getAllPublications = asyncHandler(async (req, res, next) => {
  console.log("=== GET ALL PUBLICATIONS REQUEST ===");

  try {
    const publications = await Publication.find().sort({ createdAt: -1 });

    console.log("Total publications found:", publications.length);

    if (publications.length > 0) {
      console.log("Sample publication (first):", {
        id: publications[0]._id,
        title: publications[0].title,
        description: publications[0].description,
        paperId: publications[0].paperId,
        platform: publications[0].platform,
        status: publications[0].status,
        imagesCount: publications[0].images?.length || 0,
      });
    }

    res.status(200).json({
      success: true,
      publications,
    });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return next(new ErrorHandler("Failed to fetch publications", 500));
  }
});

// REMOVE IMAGE FROM PUBLICATION
export const removeImageFromPublication = asyncHandler(
  async (req, res, next) => {
    console.log("=== REMOVE IMAGE FROM PUBLICATION ===");
    console.log("Publication ID:", req.params.id);
    console.log("Image ID:", req.params.imageId);

    const { id, imageId } = req.params;
    const publication = await Publication.findById(id);

    if (!publication) {
      return next(new ErrorHandler("Publication not found!", 404));
    }

    // Ensure images array exists
    if (!publication.images || !Array.isArray(publication.images)) {
      return next(
        new ErrorHandler("No images found for this publication", 404)
      );
    }

    const imageIndex = publication.images.findIndex(
      (img) => img._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return next(new ErrorHandler("Image not found!", 404));
    }

    const imageToRemove = publication.images[imageIndex];
    console.log("Image to remove:", imageToRemove);

    // Delete from Cloudinary
    if (imageToRemove.public_id) {
      try {
        await cloudinary.uploader.destroy(imageToRemove.public_id);
        console.log("Image deleted from Cloudinary");
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    // Remove from array
    publication.images.splice(imageIndex, 1);

    try {
      await publication.save();
      console.log("Image removed from publication");

      res.status(200).json({
        success: true,
        message: "Image removed successfully",
        publication,
      });
    } catch (saveError) {
      console.error("Error saving publication after image removal:", saveError);
      return next(new ErrorHandler("Failed to remove image", 500));
    }
  }
);
