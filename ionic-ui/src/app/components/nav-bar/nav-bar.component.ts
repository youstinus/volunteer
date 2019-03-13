import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router, RouterEvent} from  '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  pages = [
    {
      title: 'First Page',
      url: 'login'
    }
  ]
  selectedPath = '';
  constructor(private router: Router) { 
    this.router.events.subscribe((event : RouterEvent) =>{
this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

}
