import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/todos';

export function createTodo(todo) {
  return axios.post(`${BASE_URL}/add`, todo);
}

export function getAllTodos() {
  return axios.get(`${BASE_URL}/get`);
}

export function getTodoById(id) {
  return axios.get(`${BASE_URL}/get/${id}`);
}

export function updateTodo(id, todo) {
  return axios.put(`${BASE_URL}/update/${id}`, todo);
}

export function deleteTodo(id) {
  return axios.delete(`${BASE_URL}/delete/${id}`);
}

export const completeTodo = (id) => {
  return axios.patch(`${BASE_URL}/complete/${id}`);
};

export const uncompleteTodo = (id) => {
  return axios.patch(`${BASE_URL}/incomplete/${id}`);
};