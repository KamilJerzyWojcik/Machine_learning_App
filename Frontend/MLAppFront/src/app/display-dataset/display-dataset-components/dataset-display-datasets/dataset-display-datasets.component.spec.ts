import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDisplayDatasetsComponent } from './dataset-display-datasets.component';

describe('DatasetDisplayDatasetsComponent', () => {
  let component: DatasetDisplayDatasetsComponent;
  let fixture: ComponentFixture<DatasetDisplayDatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetDisplayDatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDisplayDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
