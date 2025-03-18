import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import cloudinary from "../utils/cloudinary.js";

export const addNewProject = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.projectBanner) {
    return next(
      new ErrorHandler("Please Upload Your PROJECT BANNER File!", 400)
    );
  }

  const projectBannerPath = req.files.projectBanner[0].path;

  // Upload avatar
  const resForProjectBanner = await cloudinary.uploader.upload(
    projectBannerPath,
    {
      folder: "ProjectBanner",
    }
  );

  if (!resForProjectBanner || resForProjectBanner.error) {
    console.error(
      "Error in uploading avatar: ",
      resForProjectBanner.error || "Unknown Error"
    );
  }

  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("Please provide all the fields!", 400));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
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
    if (!resForProjectBanner || resForProjectBanner.error) {
      console.error(
        "Error in uploading avatar: ",
        resForProjectBanner.error || "Unknown Error"
      );
    }
    project.projectBanner = {
      public_id: resForProjectBanner.public_id,
      url: resForProjectBanner.secure_url,
    };
  }
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;
  if (title) {
    project.title = title;
  }
  if (description) {
    project.description = description;
  }
  if (gitRepoLink) {
    project.gitRepoLink = gitRepoLink;
  }
  if (projectLink) {
    project.projectLink = projectLink;
  }
  if (technologies) {
    project.technologies = technologies;
  }
  if (stack) {
    project.stack = stack;
  }
  if (deployed) {
    project.deployed = deployed;
  }
  await project.save();
  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Software Application not found!", 404));
  }

  // Use the svg field which contains the Cloudinary public id.
  const projectprojectBannerId = project.projectBanner;
  await cloudinary.uploader.destroy(projectprojectBannerId);
  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

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
      error,
    });
  }
});

export const getAllProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});
