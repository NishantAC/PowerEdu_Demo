import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"todos/";

const createTodo = async (todoData) => {
  try {
    const response = await axios.post(`${API_URL}add`, todoData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTodos = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}get/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTodo = async (body) => {
  try {
    const response = await axios.put(`${API_URL}todoupdate`,body)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TodoService = {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo
};

export default TodoService;
