import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersPage } from './volunteers.page';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { ModalController, AngularDelegate, IonicModule } from '@ionic/angular';
import { VolunteersService } from '../../services/volunteers.service';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms'

import { BaseService } from '../../services/base.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { APP_BASE_HREF } from '@angular/common';

describe('VolunteersPage', () => {
  let component: VolunteersPage;
  let fixture: ComponentFixture<VolunteersPage>;

  const fakeActivatedRoute = {
    snapshot: { data: {}, params: Observable.create({ id: '2' }) }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteersPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, IonicModule,],
      providers: [CookieService, ModalController, AngularDelegate, VolunteersService, UsersService, BaseService, NavController,
        FormBuilder, NavController,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }, Location,
        { provide: APP_BASE_HREF, useValue: '.' },
        RouterTestingModule, ProjectsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
