import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDisplayComponent } from './dataset-display.component';

describe('DatasetDisplayComponent', () => {
  let component: DatasetDisplayComponent;
  let fixture: ComponentFixture<DatasetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
