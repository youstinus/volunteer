import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotFoundPage } from './not-found.page';


const routes: Routes = [
  {
    path: '',
    component: NotFoundPage
  }
];
@Component({
  selector: 'app-notfound',
  templateUrl: './not-found.page.html'
})
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotFoundPage],
  entryComponents: [
    NotFoundPage
]
  
})

export class NotFoundPageModule { }

