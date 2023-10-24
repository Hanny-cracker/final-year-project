import { TestBed } from '@angular/core/testing';

import { RoutePatGuardService } from './route-pat-guard.service';

describe('RoutePatGuardService', () => {
  let service: RoutePatGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePatGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
