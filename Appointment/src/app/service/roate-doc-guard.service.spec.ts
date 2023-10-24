import { TestBed } from '@angular/core/testing';

import { RoateDocGuardService } from './route-doc-guard.service';

describe('RoateDocGuardService', () => {
  let service: RoateDocGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoateDocGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
