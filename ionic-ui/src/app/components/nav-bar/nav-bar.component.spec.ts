import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarPage } from './nav-bar.page';

describe('NavBarPage', () => {
  let component: NavBarPage;
  let fixture: ComponentFixture<NavBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
