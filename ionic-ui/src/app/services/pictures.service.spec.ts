import { TestBed } from '@angular/core/testing';

import { PicturesService } from './pictures.service';

describe('PicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicturesService = TestBed.get(PicturesService);
    expect(service).toBeTruthy();
  });
});
