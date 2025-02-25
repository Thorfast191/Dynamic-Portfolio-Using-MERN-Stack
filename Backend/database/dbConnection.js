import mongoose from "mongoose";

const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(`Database connection faile: ${error}`);
    });
};

export default dbConnection;
