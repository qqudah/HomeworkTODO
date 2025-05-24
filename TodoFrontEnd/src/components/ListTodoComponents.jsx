import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../services/TodoService'

const ListTodoComponents = () => {
 const [todos,setTodos] = useState([])
    useEffect(() => {
      listTodos();
    }, [])

    function listTodos(){
      getAllTodos().then((response) => {
        setTodos(response.data)
      }).catch((error) => {
        console.error("Error fetching todos", error)
      })
    }

   
    
  return (
    <div className='container'><h1 className='text-center'>List of todos</h1>
    <div>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
          </tr>
        </thead>
       <tbody>
  {
    todos.map(todo => (
      <tr key={todo.id}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.completed ? 'Yes' : 'No'}</td>
      </tr>
    ))
  }
</tbody>
      </table>
      </div>
      </div>
  )
}

export default ListTodoComponents