import { TestBed } from '@angular/core/testing';

import { DmvSchedulerService } from './dmv-scheduler.service';

describe('DmvSchedulerService', () => {
  let service: DmvSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmvSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
