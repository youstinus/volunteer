import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { OrganizationsSettingsPage } from './organizations-settings.page';
import {ComponentsModule} from '../../shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsSettingsPage
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
  declarations: [OrganizationsSettingsPage]
})
export class OrganizationsSettingsPageModule {}
