import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuPage } from './pages/menu/menu.page';
import { ComponentsModule } from './shared/components.module';
import { FooterPage } from './pages/footer/footer.page';
import { CookieService } from 'ngx-cookie-service';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { JwtModule } from '@auth0/angular-jwt';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent, MenuPage, FooterPage
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        //JwtModule.forRoot({}),
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CookieService,
        StreamingMedia,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
        //,{ provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
