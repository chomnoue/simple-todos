import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimpletodoSharedModule } from 'app/shared/shared.module';
import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail.component';
import { TodoUpdateComponent } from './todo-update.component';
import { TodoDeletePopupComponent, TodoDeleteDialogComponent } from './todo-delete-dialog.component';
import { todoRoute, todoPopupRoute } from './todo.route';

const ENTITY_STATES = [...todoRoute, ...todoPopupRoute];

@NgModule({
  imports: [SimpletodoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TodoComponent, TodoDetailComponent, TodoUpdateComponent, TodoDeleteDialogComponent, TodoDeletePopupComponent],
  entryComponents: [TodoComponent, TodoUpdateComponent, TodoDeleteDialogComponent, TodoDeletePopupComponent]
})
export class SimpletodoTodoModule {}
