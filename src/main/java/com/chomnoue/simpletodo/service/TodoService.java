package com.chomnoue.simpletodo.service;

import com.chomnoue.simpletodo.domain.Todo;
import com.chomnoue.simpletodo.repository.TodoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Todo}.
 */
@Service
@Transactional
public class TodoService {

    private final Logger log = LoggerFactory.getLogger(TodoService.class);

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Save a todo.
     *
     * @param todo the entity to save.
     * @return the persisted entity.
     */
    public Todo save(Todo todo) {
        log.debug("Request to save Todo : {}", todo);
        return todoRepository.save(todo);
    }

    /**
     * Save a todo.
     *
     * @param todo the entity to save.
     * @return the persisted entity.
     */
    public Optional<Todo> update(Todo todo) {
        log.debug("Request to update Todo : {}", todo);
        return todoRepository.findByIdAndUserId(todo.getId(), todo.getUserId())
            .map(existing -> todoRepository.save(todo));
    }

    /**
     * Get all the todos.
     *
     * @param pageable the pagination information.
     * @param user
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Todo> findAll(Pageable pageable, Long user) {
        log.debug("Request to get all Todos");
        return todoRepository.findByUserId(user, pageable);
    }


    /**
     * Get one todo by id.
     *
     * @param id   the id of the entity.
     * @param user
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Todo> findOne(Long id, Long user) {
        log.debug("Request to get Todo : {}", id);
        return todoRepository.findByIdAndUserId(id, user);
    }

    /**
     * Delete the todo by id.
     *
     * @param id   the id of the entity.
     * @param user
     */
    public void delete(Long id, Long user) {
        log.debug("Request to delete Todo : {}", id);
        todoRepository.deleteByIdAndUserId(id, user);
    }
}
