import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersPage } from './volunteers.page';

describe('VolunteersPage', () => {
  let component: VolunteersPage;
  let fixture: ComponentFixture<VolunteersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
