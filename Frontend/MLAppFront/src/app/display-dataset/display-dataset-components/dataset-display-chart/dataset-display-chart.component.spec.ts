import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDisplayChartComponent } from './dataset-display-chart.component';

describe('DatasetDisplayChartComponent', () => {
  let component: DatasetDisplayChartComponent;
  let fixture: ComponentFixture<DatasetDisplayChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetDisplayChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDisplayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
