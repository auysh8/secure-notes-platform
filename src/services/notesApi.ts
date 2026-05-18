import axios from "axios";
import type { Note } from "../types";

const apiUrl = `https://notes-app-hjn2.onrender.com/api/notes`;

const getApi = () =>
  axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteNote = (id: string) => getApi().delete(id);

export const restoreNote = (id: string) =>
  getApi().put(id, {
    isTrashed: false,
  });

export const trashNote = (id: string) =>
  getApi().put(id, {
    isTrashed: true,
  });

export const archiveNote = (id: string, archiveStatus: boolean) =>
  getApi().put(id, {
    isArchived: archiveStatus,
  });

export const pinNote = (id: string, pinStatus: boolean) =>
  getApi().put(id, {
    isPinned: pinStatus,
  });

export const saveNote = (note: Note) => getApi().post("", note);

export const editNote = (
  id: string,
  title: string,
  content: string,
  color: string,
) =>
  getApi().put(id, {
    title: title,
    content: content,
    color: color,
    lastEdited: Date.now(),
  });

export const getNotes = () => getApi().get("");
