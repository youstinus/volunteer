import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HeaderPage} from '../pages/header/header.page';
import {FooterPage} from '../pages/footer/footer.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [HeaderPage, FooterPage],
    exports: [HeaderPage, FooterPage]
})
export class ComponentsModule {}
