const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes.routes");
const userRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const errHandler = require("./middleware/error.middleware");
const errorHandler = require("./middleware/error.middleware");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
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
