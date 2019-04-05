import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalVolunteerPage } from './modal-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVolunteerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
   // RouterModule.forChild(routes)
  ],
  declarations: [ModalVolunteerPage],
  entryComponents: [ModalVolunteerPage]
})
export class ModalVolunteerPageModule {}
