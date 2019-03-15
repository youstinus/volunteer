import {Component, OnInit} from '@angular/core';
import {RouterEvent, Router} from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.page.html',
    styleUrls: ['./nav-menu.page.scss'],
})
export class NavMenuPage implements OnInit {

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
            url: '/saved_projects'
        },
        {
            title: 'Settings',
            url: '/settings'
        },
        
        {
            title: 'Logout',
            url: '/logout'
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

    onClick(){
        console.log("hhh");
    }
}
