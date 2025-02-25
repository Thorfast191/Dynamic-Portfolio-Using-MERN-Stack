import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Timeline } from "../models/timelineSchema.js";

export const post = asyncHandler(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newPost = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res
    .status(200)
    .json({ success: true, message: "Posted in the timeline.", newPost });
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Build an update object only with the provided fields.
  const updateData = {};

  // Update title and description only if provided (and non-empty).
  if (req.body.title !== undefined && req.body.title !== "") {
    updateData.title = req.body.title;
  }
  if (req.body.description !== undefined && req.body.description !== "") {
    updateData.description = req.body.description;
  }

  // Update timeline fields using dot notation for partial updates.
  if (req.body.from !== undefined && req.body.from !== "") {
    updateData["timeline.from"] = req.body.from;
  }
  if (req.body.to !== undefined && req.body.to !== "") {
    updateData["timeline.to"] = req.body.to;
  }

  // Perform the update.
  const updatedPost = await Timeline.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedPost) {
    return next(new ErrorHandler("Timeline post not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Timeline post updated successfully.",
    updatedPost,
  });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedPost = await Timeline.findByIdAndDelete(id);
  if (!deletedPost) {
    return next(new ErrorHandler("Timeline post not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Timeline post deleted successfully.",
    deletedPost,
  });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const posts = await Timeline.find();
  res.status(200).json({ success: true, posts });
});
