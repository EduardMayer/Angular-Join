import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardDialogComponent } from './task-card-dialog.component';

describe('TaskCardDialogComponent', () => {
  let component: TaskCardDialogComponent;
  let fixture: ComponentFixture<TaskCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
