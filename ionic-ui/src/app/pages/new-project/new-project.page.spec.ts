import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectPage } from './new-project.page';

describe('NewProjectPage', () => {
  let component: NewProjectPage;
  let fixture: ComponentFixture<NewProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
