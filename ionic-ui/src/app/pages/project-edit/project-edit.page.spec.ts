import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditPage } from './project-edit.page';

describe('ProjectEditPage', () => {
  let component: ProjectEditPage;
  let fixture: ComponentFixture<ProjectEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
