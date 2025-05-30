import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, getTodoById ,updateTodo } from "../services/TodoService";
const ToDocomponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function Saveorupdatetodo(e) {

    e.preventDefault();
    const todo = { title, description, completed };
    console.log("Saving todo:", todo);

    if(id) {
      // Update existing todo
      updateTodo(id, todo)
        .then((response) => {
          console.log("Todo updated successfully:", response.data);
          navigate("/todos");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
      return;
    }
    else {

    createTodo(todo)
      .then((response) => {
        console.log("Todo saved successfully:", response.data);
        navigate("/todos");
      })
      .catch((error) => {
        console.error("Error saving todo:", error);
      });
  }
}


  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update To-Do</h2>;
    } else {
      return <h2 className="text-center">Add To-Do</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getTodoById(id).then((response) => {
        const todo = response.data;
        setTitle(todo.title);
        setDescription(todo.description);
        setCompleted(todo.completed);
      });
    }
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <h2 className="text-center"></h2>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  placeholder="Title"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  placeholder="Description"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    name="completed"
                    className="form-check-input"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  Completed
                </label>
              </div>
              <button className="btn btn-success" onClick={Saveorupdatetodo}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDocomponent;
