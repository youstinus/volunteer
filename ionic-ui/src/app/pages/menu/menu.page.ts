import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    public pages = [
        {
            title: 'Login',
            url: '/login'
        },
        {
            title: 'Registration',
            url: '/registration'
        },
        {
            title: 'Main',
            url: '/main'
        },
        {
            title: 'Projects',
            url: '/projects'
        },
        {
            title: 'Organizations',
            url: '/organizations'
        },

        {
            title: 'Calendar',
            url: '/calendar'
        },
        {
            title: 'About us',
            url: '/about'
        },
        {
            title: 'Privacy policy',
            url: '/privacy'
        },
        {
            title: 'Saved projects',
            url: '/projects'
        },
        {
            title: 'Settings',
            url: '/volunteers-settings'
        },

        {
            title: 'Logout',
            url: '/main'
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

    onClick() {
        console.log('hhh');
    }

}
