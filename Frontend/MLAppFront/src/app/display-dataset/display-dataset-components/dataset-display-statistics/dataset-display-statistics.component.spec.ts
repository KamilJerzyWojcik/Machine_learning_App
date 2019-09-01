import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDisplayStatisticsComponent } from './dataset-display-statistics.component';

describe('DatasetDisplayStatisticsComponent', () => {
  let component: DatasetDisplayStatisticsComponent;
  let fixture: ComponentFixture<DatasetDisplayStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetDisplayStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDisplayStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
