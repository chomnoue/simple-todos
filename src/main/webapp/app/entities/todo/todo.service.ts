import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITodo } from 'app/shared/model/todo.model';

type EntityResponseType = HttpResponse<ITodo>;
type EntityArrayResponseType = HttpResponse<ITodo[]>;

@Injectable({ providedIn: 'root' })
export class TodoService {
  public resourceUrl = SERVER_API_URL + 'api/todos';

  constructor(protected http: HttpClient) {}

  create(todo: ITodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(todo);
    return this.http
      .post<ITodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(todo: ITodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(todo);
    return this.http
      .put<ITodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITodo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITodo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(todo: ITodo): ITodo {
    const copy: ITodo = Object.assign({}, todo, {
      dueDate: todo.dueDate != null && todo.dueDate.isValid() ? todo.dueDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((todo: ITodo) => {
        todo.dueDate = todo.dueDate != null ? moment(todo.dueDate) : null;
      });
    }
    return res;
  }
}
