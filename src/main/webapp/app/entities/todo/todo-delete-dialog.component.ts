import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITodo } from 'app/shared/model/todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'jhi-todo-delete-dialog',
  templateUrl: './todo-delete-dialog.component.html'
})
export class TodoDeleteDialogComponent {
  todo: ITodo;

  constructor(protected todoService: TodoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.todoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'todoListModification',
        content: 'Deleted an todo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-todo-delete-popup',
  template: ''
})
export class TodoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ todo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TodoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.todo = todo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/todo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/todo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
