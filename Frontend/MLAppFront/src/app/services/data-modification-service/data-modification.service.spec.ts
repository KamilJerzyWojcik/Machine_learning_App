import { TestBed } from '@angular/core/testing';

import { DataModificationService } from './data-modification.service';

describe('DataModificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataModificationService = TestBed.get(DataModificationService);
    expect(service).toBeTruthy();
  });
});
