import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrganizationPage } from './organization.page';
import {ComponentsModule} from '../../shared/components.module';
const routes: Routes = [
  {
    path: '',
    component: OrganizationPage
  }
];

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [OrganizationPage]
})
export class OrganizationPageModule {}







