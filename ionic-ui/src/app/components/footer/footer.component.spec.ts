import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPage } from './footer.page';

describe('FooterPage', () => {
  let component: FooterPage;
  let fixture: ComponentFixture<FooterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
