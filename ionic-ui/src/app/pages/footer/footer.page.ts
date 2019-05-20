import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  flagClicked(lang: string) {
    this.cookieService.set('Lang', lang, 365, '/');
    location.reload(); 
  }
}
