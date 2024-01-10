import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactCardComponent } from './show-contact-card.component';

describe('ShowContactCardComponent', () => {
  let component: ShowContactCardComponent;
  let fixture: ComponentFixture<ShowContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowContactCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
