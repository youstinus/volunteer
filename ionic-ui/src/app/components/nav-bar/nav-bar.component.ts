import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(private navbar: MenuController) { }

  openFirst() {
    this.navbar.enable(true, 'first');
    this.navbar.open('first');
  }

  openEnd() {
    this.navbar.open('end');
  }

  openCustom() {
    this.navbar.enable(true, 'custom');
    this.navbar.open('custom');
  }

  ngOnInit() {}

}
