import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';


import {IonicModule} from '@ionic/angular';

import {VolunteersSettingsPage} from './volunteers-settings.page';
import {ComponentsModule} from '../../shared/components.module';

const routes: Routes = [
    {
        path: '',
        component: VolunteersSettingsPage
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
    declarations: [VolunteersSettingsPage]
})
export class VolunteersSettingsPageModule {
}
