import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodo } from 'app/shared/model/todo.model';

@Component({
  selector: 'jhi-todo-detail',
  templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent implements OnInit {
  todo: ITodo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ todo }) => {
      this.todo = todo;
    });
  }

  previousState() {
    window.history.back();
  }
}
