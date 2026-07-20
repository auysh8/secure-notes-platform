import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./routes/notes.routes";
import userRoutes from "./routes/auth.routes";
import authMiddleware from "./middleware/auth.middleware";
import errorHandler from "./middleware/error.middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://auysh8.github.io"],
  }),
);
app.use(express.json());

app.use("/api/notes", authMiddleware, notesRouter);
app.use("/api/auth", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The backend is live at ${PORT}`);
});
