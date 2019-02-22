import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuPage } from './nav-menu.page';

describe('NavMenuPage', () => {
  let component: NavMenuPage;
  let fixture: ComponentFixture<NavMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
