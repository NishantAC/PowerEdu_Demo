import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"notes/";

const registerNote = async (schoolCode, className, subjectName, chapterName, noteName, createdBy) => {
  try {
    const response = await axios.post(`${API_URL}register-note`, {
      schoolCode,
      className,
      subjectName,
      chapterName,
      noteName,
      createdBy,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteNoteById = async (body) => {
  try {
    const response = await axios.post(`${API_URL}deletenotes`,body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//creating new note for particular class by id
const createNote = async (body) => {
  try {
    console.table(body)
    const response = await axios.post(`${API_URL}notes`, body
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const NoteService = {
  registerNote,
  deleteNoteById,
  createNote
};

export default NoteService;
