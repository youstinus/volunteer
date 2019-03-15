import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NavMenuPage } from './nav-menu.page';

const routes: Routes = [
  {
    path: '',
    component: NavMenuPage,
    //children: [
    //  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
      //{path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule'}
   // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NavMenuPage]
})
export class NavMenuPageModule {}
