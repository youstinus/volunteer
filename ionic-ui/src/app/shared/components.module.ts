import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HeaderPage} from '../pages/header/header.page';
import { SafePipe } from './safe.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [HeaderPage, SafePipe],
    exports: [HeaderPage, SafePipe]
})
export class ComponentsModule {}
