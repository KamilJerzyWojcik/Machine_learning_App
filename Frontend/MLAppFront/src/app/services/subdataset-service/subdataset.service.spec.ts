import { TestBed } from '@angular/core/testing';

import { SubdatasetService } from './subdataset.service';

describe('SubdatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubdatasetService = TestBed.get(SubdatasetService);
    expect(service).toBeTruthy();
  });
});
