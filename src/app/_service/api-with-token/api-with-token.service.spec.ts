import { TestBed } from '@angular/core/testing';

import { ApiWithTokenService } from './api-with-token.service';

describe('ApiWithTokenService', () => {
  let service: ApiWithTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWithTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
