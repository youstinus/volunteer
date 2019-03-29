import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersSettingsPage } from './volunteers-settings.page';

describe('VolunteersSettingsPage', () => {
  let component: VolunteersSettingsPage;
  let fixture: ComponentFixture<VolunteersSettingsPage>;






  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
