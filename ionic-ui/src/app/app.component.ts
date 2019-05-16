import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CookieService } from 'ngx-cookie-service';
import { Language } from './utilities/Language';
import { Lt } from './constants/Lt';
import { En } from './constants/En';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cookieService: CookieService
  ) {
    this.getLanguage();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getLanguage() {        
    let lang = this.cookieService.get('Lang');
    switch (lang) {
        case 'lt':
          Language.Lang = Lt.Lt;
          break;
        case 'en':
          Language.Lang = En.En;
          break;
        default:
          Language.Lang = Lt.Lt;
          break;
      }   
}
}
