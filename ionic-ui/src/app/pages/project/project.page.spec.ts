import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { IonicModule, NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProjectPage } from './project.page';
import { SafePipe } from 'src/app/shared/safe.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectPage', () => {
  let component: ProjectPage;
  let fixture: ComponentFixture<ProjectPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPage, SafePipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, // HttpClientModule,
        HttpClientTestingModule],
      providers: [Location, LocationStrategy, // HttpHandler,
        StreamingMedia, Language,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'},
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      // {provide: NavParams, useValue: NavParamsMock},
      CookieService, RouterTestingModule,  NavController
          ]    })
    .compileComponents();
  }));

  class NavParamsMock {
    static returnParam = null;
    static setParams(value) {
      NavParamsMock.returnParam = value;
    }
    public get(key): any {
      if (NavParamsMock.returnParam) {
         return NavParamsMock.returnParam;
      }
      return 'default';
    }
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.projectTitle).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectEdit).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectVolunteers).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectFind).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectSaved).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectsYouVolunteer).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectSave).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectsToVolunteer).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectStart).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectEnd).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.projectGoBack).toBeDefined();
  });
  it('should have a working function', () => {
     expect(component.check).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.checkForProjects).toBeTruthy();
 });
 it('should have a working function', () => {
  expect(component.getRole).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.goToProjects).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.isEmptyOrSpaces).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.isSelected).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.navigateToEdit).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.navigateToVolunteers).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.ngOnInit).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.onEmailClicked).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.onPhoneClicked).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.onSourceClicked).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.removeFromSaveList).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.removeFromSelectedProjectS).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.setVolunteer).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.updateUrl).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.addToSaveList).toBeTruthy();
});
it('should have a working function', () => {
  expect(component.addToSelecteDProjectS).toBeTruthy();
});

});
