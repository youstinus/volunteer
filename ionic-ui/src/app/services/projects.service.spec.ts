import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('ProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });
});
