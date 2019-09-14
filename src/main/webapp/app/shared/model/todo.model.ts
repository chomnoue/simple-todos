import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ITodo {
  id?: number;
  title?: string;
  dueDate?: Moment;
  priority?: number;
  completed?: boolean;
  user?: IUser;
}

export class Todo implements ITodo {
  constructor(
    public id?: number,
    public title?: string,
    public dueDate?: Moment,
    public priority?: number,
    public completed?: boolean,
    public user?: IUser
  ) {
    this.completed = this.completed || false;
  }
}
