import { TestBed } from '@angular/core/testing';

import { ApiNoTokenService } from './api-no-token.service';

describe('ApiNoTokenService', () => {
  let service: ApiNoTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNoTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
