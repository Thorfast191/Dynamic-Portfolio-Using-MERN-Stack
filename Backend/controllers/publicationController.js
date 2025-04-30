import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Publication } from "../models/publicationSchema.js";
import cloudinary from "../utils/cloudinary.js";

export const addNewPublication = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.publication) {
    return next(new ErrorHandler("Please Upload Your PUBLICATION File!", 400));
  }

  const publicationPath = req.files.publication[0].path;

  // Upload avatar
  const resForPublication = await cloudinary.uploader.upload(publicationPath, {
    folder: "Publication",
  });

  if (!resForPublication || resForPublication.error) {
    console.error(
      "Error in uploading avatar: ",
      resForPublication.error || "Unknown Error"
    );
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Please provide all the fields!", 400));
  }

  const publication = await Publication.create({
    title,
    description,
    publication: {
      public_id: resForPublication.public_id,
      url: resForPublication.secure_url,
    },
  });

  if (!publication) {
    return next(new ErrorHandler("Error in creating Publication!", 400));
  }

  res.status(201).json({
    success: true,
    publication,
  });
});

export const updatePublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findById(req.params.id);

  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  if (publication.publication.public_id) {
    await cloudinary.uploader.destroy(publication.publication.public_id);
  }

  if (!req.files || !req.files.publication) {
    return next(new ErrorHandler("Please Upload Your PUBLICATION File!", 400));
  }

  const publicationPath = req.files.publication[0].path;

  // Upload avatar
  const resForPublication = await cloudinary.uploader.upload(publicationPath, {
    folder: "Publication",
  });

  if (!resForPublication || resForPublication.error) {
    console.error(
      "Error in uploading avatar: ",
      resForPublication.error || "Unknown Error"
    );
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Please provide all the fields!", 400));
  }

  const updatedPublication = await Publication.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      publication: {
        public_id: resForPublication.public_id,
        url: resForPublication.secure_url,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedPublication) {
    return next(new ErrorHandler("Error in updating Publication!", 400));
  }

  res.status(200).json({
    success: true,
    updatedPublication,
  });
});

export const deletePublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findById(req.params.id);

  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  if (publication.publication.public_id) {
    await cloudinary.uploader.destroy(publication.publication.public_id);
  }

  await publication.remove();

  res.status(200).json({
    success: true,
    message: "Publication deleted successfully",
  });
});

export const getSinglePublication = asyncHandler(async (req, res, next) => {
  const publication = await Publication.findById(req.params.id);

  if (!publication) {
    return next(new ErrorHandler("Publication not found!", 404));
  }

  res.status(200).json({
    success: true,
    publication,
  });
});

export const getAllPublications = asyncHandler(async (req, res, next) => {
  const publications = await Publication.find();

  if (!publications) {
    return next(new ErrorHandler("Publications not found!", 404));
  }

  res.status(200).json({
    success: true,
    publications,
  });
});
