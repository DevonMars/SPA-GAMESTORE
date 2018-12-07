import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesDetailsComponent } from './accessories-details.component';

describe('AccessoriesDetailsComponent', () => {
  let component: AccessoriesDetailsComponent;
  let fixture: ComponentFixture<AccessoriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
