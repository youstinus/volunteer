import { TestBed } from '@angular/core/testing';

import { VolunteersService } from './volunteers.service';

describe('VolunteersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteersService = TestBed.get(VolunteersService);
    expect(service).toBeTruthy();
  });
});
