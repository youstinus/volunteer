import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectPage } from './project.page';
import {ComponentsModule} from '../../shared/components.module';
// import { Clipboard } from '@ionic-native/clipboard/ngx';
const routes: Routes = [
  {
    path: '',
    component: ProjectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
   // Clipboard
  ],
  declarations: [ProjectPage]
})
export class ProjectPageModule {}
