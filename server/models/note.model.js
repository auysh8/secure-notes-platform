const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default : "",
  },
  content: {
    type: String,
    default : "",
  },
  color: {
    type: String,
    default : "",
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  lastEdited: {
    type: Date,
    default: new Date().getTime(),
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Note" , noteSchema)
