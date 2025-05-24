import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/todos/get';

export function getAllTodos() {
    return axios.get(BASE_URL)
}