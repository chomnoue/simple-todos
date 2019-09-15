package com.chomnoue.simpletodo.web.rest;

import com.chomnoue.simpletodo.domain.Todo;
import com.chomnoue.simpletodo.security.DomainUser;
import com.chomnoue.simpletodo.service.TodoService;
import com.chomnoue.simpletodo.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link Todo}.
 */
@RestController
@RequestMapping("/api")
@Validated
public class TodoResource {

    private final Logger log = LoggerFactory.getLogger(TodoResource.class);

    private static final String ENTITY_NAME = "todo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TodoService todoService;

    public TodoResource(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * {@code POST  /todos} : Create a new todo.
     *
     * @param todo the todo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new todo, or with status
     * {@code 400 (Bad Request)} if the todo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody @Valid Todo todo,
        @AuthenticationPrincipal(errorOnInvalidType = true) DomainUser domainUser) throws URISyntaxException {
        log.debug("REST request to save Todo : {}", todo);
        if (todo.getId() != null) {
            throw new BadRequestAlertException("A new todo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        todo.setUserId(domainUser.getId());
        Todo result = todoService.save(todo);
        return ResponseEntity.created(new URI("/api/todos/" + result.getId()))
            .headers(
                HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /todos} : Updates an existing todo.
     *
     * @param todo the todo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated todo, or with status
     * {@code 400 (Bad Request)} if the todo is not valid, or with status {@code 500 (Internal Server Error)} if the
     * todo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/todos")
    public ResponseEntity<Todo> updateTodo(@RequestBody @Valid Todo todo,
        @AuthenticationPrincipal(errorOnInvalidType = true) DomainUser domainUser) throws URISyntaxException {
        log.debug("REST request to update Todo : {}", todo);
        if (todo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        todo.setUserId(domainUser.getId());
        Optional<Todo> result = todoService.update(todo);
        HttpHeaders headers = HeaderUtil
            .createEntityUpdateAlert(applicationName, false, ENTITY_NAME, todo.getId().toString());
        return ResponseUtil.wrapOrNotFound(result, headers);
    }

    /**
     * {@code GET  /todos} : get all the todos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of todos in body.
     */
    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodos(Pageable pageable,
        @AuthenticationPrincipal(errorOnInvalidType = true) DomainUser domainUser) {
        log.debug("REST request to get a page of Todos");
        Page<Todo> page = todoService.findAll(pageable, domainUser.getId());
        HttpHeaders headers = PaginationUtil
            .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /todos/:id} : get the "id" todo.
     *
     * @param id the id of the todo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the todo, or with status {@code 404
     * (Not Found)}.
     */
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id,
        @AuthenticationPrincipal(errorOnInvalidType = true) DomainUser domainUser) {
        log.debug("REST request to get Todo : {}", id);
        Optional<Todo> todo = todoService.findOne(id, domainUser.getId());
        return ResponseUtil.wrapOrNotFound(todo);
    }

    /**
     * {@code DELETE  /todos/:id} : delete the "id" todo.
     *
     * @param id the id of the todo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id,
        @AuthenticationPrincipal(errorOnInvalidType = true) DomainUser domainUser) {
        log.debug("REST request to delete Todo : {}", id);
        todoService.delete(id, domainUser.getId());
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
