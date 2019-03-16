import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrganizationsPage } from './organizations.page';
import {ComponentsModule} from '../../shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsPage
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
  declarations: [OrganizationsPage]
})
export class OrganizationsPageModule {}
