import { TestBed } from '@angular/core/testing';

import { RouteAdmGuardService } from './route-adm-guard.service';

describe('RouteAdmGuardService', () => {
  let service: RouteAdmGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAdmGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
