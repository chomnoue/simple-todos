import { Moment } from 'moment';

export interface ITodo {
  id?: number;
  title?: string;
  dueDate?: Moment;
  priority?: number;
  completed?: boolean;
  userId?: number;
}

export class Todo implements ITodo {
  constructor(
    public id?: number,
    public title?: string,
    public dueDate?: Moment,
    public priority?: number,
    public completed?: boolean,
    public userId?: number
  ) {
    this.completed = this.completed || false;
  }
}
