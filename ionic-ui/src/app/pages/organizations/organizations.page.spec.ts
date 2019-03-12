import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsPage } from './organizations.page';

describe('OrganizationsPage', () => {
  let component: OrganizationsPage;
  let fixture: ComponentFixture<OrganizationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
