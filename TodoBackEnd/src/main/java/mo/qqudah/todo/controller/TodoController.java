package mo.qqudah.todo.controller;

import lombok.AllArgsConstructor;
import mo.qqudah.todo.dto.TodoDto;
import mo.qqudah.todo.entity.Todo;
import mo.qqudah.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private TodoService todoService;

    @PostMapping("add")
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
        TodoDto savedTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long id) {
        TodoDto todoDto = todoService.getTodoById(id);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @GetMapping("get")
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<TodoDto> todoDtos = todoService.getAllTodo();
        return new ResponseEntity<>(todoDtos, HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable("id") Long id) {
        TodoDto updatedTodo = todoService.updateTodo(todoDto, id);

        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteToDo(id);
        return ResponseEntity.ok("Task with Id " + id + " deleted successfully");
    }

    @PatchMapping({"complete/{id}"})
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long id) {
        TodoDto updatedTodo = todoService.completeToDo(id);

        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping({"incomplete/{id}"})
    public ResponseEntity<TodoDto> IncompleteTodo(@PathVariable("id") Long id) {
        TodoDto updatedTodo = todoService.IncompleteToDo(id);

        return ResponseEntity.ok(updatedTodo);
    }
}
