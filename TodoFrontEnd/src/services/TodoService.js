import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/todos';

export function createTodo(todo) {
  return axios.post(`${BASE_URL}`, todo);
}

export function getAllTodos() {
  return axios.get(`${BASE_URL}`);
}

export function getTodoById(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

export function updateTodo(id, todo) {
  return axios.put(`${BASE_URL}/${id}`, todo);
}

export function deleteTodo(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}

export const completeTodo = (id) => {
  return axios.patch(`${BASE_URL}/complete/${id}`);
};

export const uncompleteTodo = (id) => {
  return axios.patch(`${BASE_URL}/incomplete/${id}`);
};