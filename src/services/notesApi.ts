import axios from "axios";
import type { NewNote } from "../types";


const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/notes`,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/secure-notes-platform/login";
    }
    return Promise.reject(error);
  },
);

export const deleteNote = (id: string) => apiClient.delete(id);

export const restoreNote = (id: string) =>
  apiClient.put(id, {
    isTrashed: false,
  });

export const trashNote = (id: string) =>
  apiClient.put(id, {
    isTrashed: true,
  });

export const archiveNote = (id: string, archiveStatus: boolean) =>
  apiClient.put(id, {
    isArchived: archiveStatus,
  });

export const pinNote = (id: string, pinStatus: boolean) =>
  apiClient.put(id, {
    isPinned: pinStatus,
  });

export const saveNote = (note: NewNote) => apiClient.post("", note);

export const editNote = (
  id: string,
  title: string,
  content: string,
  color: string,
) =>
  apiClient.put(id, {
    title: title,
    content: content,
    color: color,
    lastEdited: Date.now(),
  });

export const getNotes = () => apiClient.get("");
