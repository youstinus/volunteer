import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectEditPage } from './project-edit.page';

import {ComponentsModule} from '../../shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ProjectEditPage]
})
export class ProjectEditPageModule {}
