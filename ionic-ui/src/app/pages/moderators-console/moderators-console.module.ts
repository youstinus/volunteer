import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModeratorsConsolePage } from './moderators-console.page';

const routes: Routes = [
  {
    path: '',
    component: ModeratorsConsolePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModeratorsConsolePage]
})
export class ModeratorsConsolePageModule {}
