import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDisplayTableComponent } from './dataset-display-table.component';

describe('DatasetDisplayTableComponent', () => {
  let component: DatasetDisplayTableComponent;
  let fixture: ComponentFixture<DatasetDisplayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetDisplayTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDisplayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
