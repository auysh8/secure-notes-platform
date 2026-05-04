import axios from "axios";
import type { Note } from "../types";

const apiUrl = `http://localhost:5000/api/notes/`

export const deleteNote = (id : string) => {
    return axios.delete(`${apiUrl}${id}`);
}

export const restoreNote = (id : string) => {
    return axios.put(`${apiUrl}${id}`, {
        isTrashed: false,
    });
}

export const trashNote = (id : string) => {
    return axios.put(`${apiUrl}${id}`, {
        isTrashed: true,
    });
}

export const archiveNote = (id : string , archiveStatus : boolean) => {
    return axios.put(`${apiUrl}${id}`, {
        isArchived: archiveStatus,
    });
}

export const pinNote = (id : string , pinStatus : boolean) => {
    return axios.put(`${apiUrl}${id}`, {
        isPinned: pinStatus,
    });
}

export const saveNote = (note : Note) => {
    return axios.post(`${apiUrl}`,
        note,
    );
}

export const editNote = (id : string , title : string , content : string , color : string) => {
    return axios.put(`${apiUrl}${id}`, {
        title: title,
        content: content,
        color: color,
        lastEdited: Date.now(),
    });
}

export const getNotes = () => {
    return axios.get(`${apiUrl}`);
}