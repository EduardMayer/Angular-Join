import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryDialogComponent } from './show-category-dialog.component';

describe('ShowCategoryDialogComponent', () => {
  let component: ShowCategoryDialogComponent;
  let fixture: ComponentFixture<ShowCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
