package mo.qqudah.todo.repository;

import mo.qqudah.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoRepositiory extends JpaRepository<Todo, Long> {
}
