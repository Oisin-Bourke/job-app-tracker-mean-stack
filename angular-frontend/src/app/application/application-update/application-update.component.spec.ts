import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUpdateComponent } from './application-update.component';

describe('IssueUpdateComponent', () => {
  let component: ApplicationUpdateComponent;
  let fixture: ComponentFixture<ApplicationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});