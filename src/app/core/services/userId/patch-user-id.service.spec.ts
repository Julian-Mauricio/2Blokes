import { TestBed } from '@angular/core/testing';

import { PatchUserIdService } from './patch-user-id.service';

describe('PatchUserIdService', () => {
  let service: PatchUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
