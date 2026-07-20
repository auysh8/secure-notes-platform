import mongoose from "mongoose";

export interface INote {
  userId: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  isArchived: boolean;
  lastEdited: Date;
  isTrashed: boolean;
}

const noteSchema = new mongoose.Schema<INote>({
  userId: { type: String, required: true },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
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

export default mongoose.model("Note", noteSchema);
