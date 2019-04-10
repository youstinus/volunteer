import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    private role: number;

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
            title: 'Calendar',
            url: '/calendar'
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
            url: '/projects/saved'
        },
        {
            title: 'Selected projects',
            url: '/projects/selected'
        },
        {
            title: 'Settings',
            url: '/volunteers-settings'
        },

        {
            title: 'Logout',
            url: '/main'
        },
        
        {
            title:'Volunteers',
            url:'/volunteers/project/1'
        }

    ];

    selectedPath = '';

    constructor(private router: Router, private usersService: UsersService) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        });
    }

    ngOnInit() {
        this.getRole();
    }

    onClick() {
        console.log('hhh');
    }

    getRole() {
        this.role = this.usersService.getRole();
        console.log(this.role);
    }

}
