import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPage } from './change-password.page';
import { ComponentsModule } from 'src/app/shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
