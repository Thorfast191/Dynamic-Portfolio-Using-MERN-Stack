import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
import multer from "multer";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRoute from "./routers/messageRouter.js";
import userRouter from "./routers/userRouter.js";
import timelineRouter from "./routers/timelineRouter.js";
import softwareApplicationsRouter from "./routers/softwareApplicationsRouter.js";
import skillRouter from "./routers/skillRouter.js";
import projectRouter from "./routers/projectRouter.js";
import publicationRouter from "./routers/publicationRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Configure multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/tmp/"); // Temporary storage directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 50MB file size limit
});

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URI, process.env.DASHBOARD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  upload.fields([
    { name: "avatar" },
    { name: "resume" },
    { name: "svg" },
    { name: "projectBanner" },
    { name: "publication" },
  ])
); // Multer middleware

app.use("/api/message", messageRoute);
app.use("/api/users", userRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/software/applications", softwareApplicationsRouter);
app.use("/api/skills", skillRouter);
app.use("/api/projects", projectRouter);
app.use("/api/publications", publicationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
