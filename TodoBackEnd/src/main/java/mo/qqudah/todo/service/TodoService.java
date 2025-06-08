package mo.qqudah.todo.service;

import lombok.AllArgsConstructor;
import mo.qqudah.todo.dto.TodoDto;
import mo.qqudah.todo.entity.Todo;
import mo.qqudah.todo.exception.TodoNotFoundException;
import mo.qqudah.todo.repository.TodoRepositiory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoService {

    private TodoRepositiory todoRepositiory;
    @Autowired
    private ModelMapper modelMapper;

    public TodoDto addTodo(TodoDto todoDto) {

        Todo todo = modelMapper.map(todoDto, Todo.class);

        Todo savedTodo = todoRepositiory.save(todo);

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);

        return savedTodoDto;

    }

    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepositiory.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id " + id + " Not found"));

        return modelMapper.map(todo, TodoDto.class);
    }

    public List<TodoDto> getAllTodo() {
        List<Todo> toDos = todoRepositiory.findAll();
        return toDos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
    }

    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepositiory.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id " + id + " Not found"));

        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepositiory.save(todo);

        return modelMapper.map(updatedTodo, TodoDto.class);

    }

    public void deleteToDo(Long id) {
        todoRepositiory.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id " + id + " Not found"));

        todoRepositiory.deleteById(id);
    }

    public TodoDto completeToDo(Long id) {
        Todo todo = todoRepositiory.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id " + id + " Not found"));
        todo.setCompleted(Boolean.TRUE);
        Todo updatedTOdo = todoRepositiory.save(todo);
        return modelMapper.map(updatedTOdo, TodoDto.class);
    }

    public TodoDto IncompleteToDo(Long id) {
        Todo todo = todoRepositiory.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id " + id + " Not found"));
        todo.setCompleted(Boolean.FALSE);
        Todo updatedTOdo = todoRepositiory.save(todo);
        return modelMapper.map(updatedTOdo, TodoDto.class);
    }

}
