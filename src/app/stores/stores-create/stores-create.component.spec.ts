import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresCreateComponent } from './stores-create.component';

describe('StoresCreateComponent', () => {
  let component: StoresCreateComponent;
  let fixture: ComponentFixture<StoresCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
