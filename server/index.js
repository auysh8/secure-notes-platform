const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.model");
const notesRouter = require("./routes/notes.routes");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The backend is live at ${PORT}`);
});
