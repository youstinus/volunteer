import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {VolunteersPage} from './volunteers.page';
import {ComponentsModule} from '../../shared/components.module';
import { ModalVolunteerPageModule } from '../modal-volunteer/modal-volunteer.module';

const routes: Routes = [
    {
        path: '',
        component: VolunteersPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        ModalVolunteerPageModule,
        RouterModule.forChild([{path: '', component: VolunteersPage}])
    ],
    declarations: [VolunteersPage]
})
export class VolunteersPageModule {
}
