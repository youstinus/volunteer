import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  private selected: number = 1;

  constructor(public navCtrl: NavController, private cookieService: CookieService) { }

  ngOnInit() {
  }

  flagClicked(lang: string) {
    /*this.cookieService.delete('Lang', '/');
    this.cookieService.delete('Lang', '.');*/
    this.cookieService.set('Lang', lang, 365, '/');
    location.reload(); 
  }
}
