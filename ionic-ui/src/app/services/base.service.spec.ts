import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { Volunteer } from '../models/Volunteer';

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseService<Volunteer> = TestBed.get(BaseService);
    expect(service).toBeTruthy();
  });
});
