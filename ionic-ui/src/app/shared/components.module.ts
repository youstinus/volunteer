import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HeaderPage} from '../pages/header/header.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [HeaderPage],
    exports: [HeaderPage]
})
export class ComponentsModule {}
