import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Todo } from 'app/shared/model/todo.model';
import { TodoService } from './todo.service';
import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail.component';
import { TodoUpdateComponent } from './todo-update.component';
import { TodoDeletePopupComponent } from './todo-delete-dialog.component';
import { ITodo } from 'app/shared/model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoResolve implements Resolve<ITodo> {
  constructor(private service: TodoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITodo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Todo>) => response.ok),
        map((todo: HttpResponse<Todo>) => todo.body)
      );
    }
    return of(new Todo());
  }
}

export const todoRoute: Routes = [
  {
    path: '',
    component: TodoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Todos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TodoDetailComponent,
    resolve: {
      todo: TodoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Todos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TodoUpdateComponent,
    resolve: {
      todo: TodoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Todos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TodoUpdateComponent,
    resolve: {
      todo: TodoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Todos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const todoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TodoDeletePopupComponent,
    resolve: {
      todo: TodoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Todos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
