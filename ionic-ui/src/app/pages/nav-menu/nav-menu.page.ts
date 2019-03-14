import {Component, OnInit} from '@angular/core';
import {RouterEvent, Router} from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.page.html',
    styleUrls: ['./nav-menu.page.scss'],
})
export class NavMenuPage implements OnInit {

    pages = [
        {
            title: 'Login',
            url: 'login'
        },
        {
            title: 'Registration',
            url: 'registration'
        }
    ];

    selectedPath = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        });
    }

    ngOnInit() {
    }

}
