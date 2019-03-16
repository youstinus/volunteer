import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

//   pages = [
//     {
//       title: 'Login',
//       url: 'login'
//     },
//     {
//       title: 'Projects',
//       url: 'projects'
//     },
//     {
//       title: 'Registration',
//       url: 'registration'
//     }

//   ]
//   selectedPath = '';
//   constructor(private router: Router) {
//     this.router.events.subscribe((event : RouterEvent) =>{
// this.selectedPath = event.url;
//     });
//   }

    ngOnInit() {
    }

}
