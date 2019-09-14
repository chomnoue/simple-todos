import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SimpletodoTestModule } from '../../../test.module';
import { TodoDeleteDialogComponent } from 'app/entities/todo/todo-delete-dialog.component';
import { TodoService } from 'app/entities/todo/todo.service';

describe('Component Tests', () => {
  describe('Todo Management Delete Component', () => {
    let comp: TodoDeleteDialogComponent;
    let fixture: ComponentFixture<TodoDeleteDialogComponent>;
    let service: TodoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimpletodoTestModule],
        declarations: [TodoDeleteDialogComponent]
      })
        .overrideTemplate(TodoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TodoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TodoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
