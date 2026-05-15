import axios from "axios";
import type { Note } from "../types";

const apiUrl = `http://localhost:5000/api/notes/`;
const token = localStorage.getItem("token");

export const deleteNote = (id: string) => {
  return axios.delete(`${apiUrl}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const restoreNote = (id: string) => {
  return axios.put(
    `${apiUrl}${id}`,
    {
      isTrashed: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const trashNote = (id: string) => {
  return axios.put(
    `${apiUrl}${id}`,
    {
      isTrashed: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const archiveNote = (id: string, archiveStatus: boolean) => {
  return axios.put(
    `${apiUrl}${id}`,
    {
      isArchived: archiveStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const pinNote = (id: string, pinStatus: boolean) => {
  return axios.put(
    `${apiUrl}${id}`,
    {
      isPinned: pinStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const saveNote = (note: Note) => {
  return axios.post(`${apiUrl}`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editNote = (
  id: string,
  title: string,
  content: string,
  color: string,
) => {
  return axios.put(
    `${apiUrl}${id}`,
    {
      title: title,
      content: content,
      color: color,
      lastEdited: Date.now(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getNotes = () => {
  return axios.get(`${apiUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
