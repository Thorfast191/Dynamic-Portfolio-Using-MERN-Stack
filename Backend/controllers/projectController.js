import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import cloudinary from "../utils/cloudinary.js";

// ADD NEW PROJECT
export const addNewProject = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.projectBanner) {
    return next(
      new ErrorHandler("Please Upload Your PROJECT BANNER File!", 400)
    );
  }

  const projectBannerPath = req.files.projectBanner[0].path;
  const resForProjectBanner = await cloudinary.uploader.upload(
    projectBannerPath,
    {
      folder: "ProjectBanner",
    }
  );

  const {
    title,
    type,
    department,
    institution,
    description,
    startDate,
    endDate,
    status,
    role,
    collaborators,
    media,
    tags,
    location,
    audience,
    impact,
    publications,
  } = req.body;

  if (!title || !type || !description) {
    return next(new ErrorHandler("Please provide required fields!", 400));
  }

  const project = await Project.create({
    title,
    type,
    department,
    institution,
    description,
    startDate,
    endDate,
    status,
    role,
    collaborators: collaborators ? JSON.parse(collaborators) : [],
    media: media ? JSON.parse(media) : [],
    tags: tags ? JSON.parse(tags) : [],
    location,
    audience,
    impact,
    publications: publications ? JSON.parse(publications) : [],
    projectBanner: {
      public_id: resForProjectBanner.public_id,
      url: resForProjectBanner.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Project added successfully",
    project,
  });
});

// UPDATE PROJECT
export const updateProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  if (req.files && req.files.projectBanner) {
    const projectBannerPath = req.files.projectBanner[0].path;
    const resForProjectBanner = await cloudinary.uploader.upload(
      projectBannerPath,
      {
        folder: "projectBanner",
      }
    );

    project.projectBanner = {
      public_id: resForProjectBanner.public_id,
      url: resForProjectBanner.secure_url,
    };
  }

  const {
    title,
    type,
    department,
    institution,
    description,
    startDate,
    endDate,
    status,
    role,
    collaborators,
    media,
    tags,
    location,
    audience,
    impact,
    publications,
  } = req.body;

  if (title) project.title = title;
  if (type) project.type = type;
  if (department) project.department = department;
  if (institution) project.institution = institution;
  if (description) project.description = description;
  if (startDate) project.startDate = startDate;
  if (endDate) project.endDate = endDate;
  if (status) project.status = status;
  if (role) project.role = role;
  if (collaborators) project.collaborators = JSON.parse(collaborators);
  if (media) project.media = JSON.parse(media);
  if (tags) project.tags = JSON.parse(tags);
  if (location) project.location = location;
  if (audience) project.audience = audience;
  if (impact) project.impact = impact;
  if (publications) project.publications = JSON.parse(publications);

  await project.save();

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
});

// DELETE PROJECT
export const deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  const projectBannerId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectBannerId);
  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

// GET SINGLE PROJECT
export const getSingleProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// GET ALL PROJECTS
export const getAllProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});
