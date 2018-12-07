import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesCreateComponent } from './accessories-create.component';

describe('AccessoriesCreateComponent', () => {
  let component: AccessoriesCreateComponent;
  let fixture: ComponentFixture<AccessoriesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
