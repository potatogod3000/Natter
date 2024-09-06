import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServerComponent } from './create-server.component';

describe('CreateServerComponent', () => {
  let component: CreateServerComponent;
  let fixture: ComponentFixture<CreateServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
