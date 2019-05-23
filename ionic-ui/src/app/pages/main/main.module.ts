import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import {ComponentsModule} from '../../shared/components.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxYoutubePlayerModule.forRoot(),
    ComponentsModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
