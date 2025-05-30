import React, { useEffect, useState } from "react";
import { getAllTodos, deleteTodo, completeTodo , uncompleteTodo} from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodoComponents = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos", error);
      });
  }

  function addNewTodo() {
    navigate("/addtodo");
  }

  function updateTodo(id) {
    navigate(`/update/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then((response) => {
        console.log("Todo deleted successfully:", response.data);
        listTodos();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then((response) => {
        console.log("Todo marked as complete:", response.data);
        listTodos();
      })
      .catch((error) => {
        console.error("Error marking todo as complete:", error);
      });
  }

  function markIncompleteTodo(id) {
    uncompleteTodo(id)
      .then((response) => {
        console.log("Todo marked as incomplete:", response.data);
        listTodos();
      })
      .catch((error) => {
        console.error("Error marking todo as incomplete:", error);
      });
  }

  return (
    <div className="container">
      <h1 className="text-center">List of Todos</h1>
      <button className="btn btn-primary mb-3" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateTodo(todo.id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => removeTodo(todo.id)} style={{ marginLeft: "10px" }}>Delete</button>
                  {!todo.completed && (
                    <button className="btn btn-success" onClick={() => markCompleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Complete</button>
                  )}
                  {todo.completed && (
                    <button className="btn btn-warning" onClick={() => markIncompleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Mark uncompleted</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponents;
