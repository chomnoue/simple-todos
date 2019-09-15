import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITodo, Todo } from 'app/shared/model/todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'jhi-todo-update',
  templateUrl: './todo-update.component.html'
})
export class TodoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    dueDate: [null, [Validators.required]],
    priority: [null, [Validators.required, Validators.min(0)]],
    completed: [null, [Validators.required]]
  });

  constructor(protected todoService: TodoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ todo }) => {
      this.updateForm(todo);
    });
  }

  updateForm(todo: ITodo) {
    this.editForm.patchValue({
      id: todo.id,
      title: todo.title,
      dueDate: todo.dueDate != null ? todo.dueDate.format(DATE_TIME_FORMAT) : null,
      priority: todo.priority,
      completed: todo.completed
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const todo = this.createFromForm();
    if (todo.id !== undefined) {
      this.subscribeToSaveResponse(this.todoService.update(todo));
    } else {
      this.subscribeToSaveResponse(this.todoService.create(todo));
    }
  }

  private createFromForm(): ITodo {
    return {
      ...new Todo(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      dueDate: this.editForm.get(['dueDate']).value != null ? moment(this.editForm.get(['dueDate']).value, DATE_TIME_FORMAT) : undefined,
      priority: this.editForm.get(['priority']).value,
      completed: this.editForm.get(['completed']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITodo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
