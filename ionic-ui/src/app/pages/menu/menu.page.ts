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
            title: 'Main',
            url: '/main',
            icon: 'home',

        },
        {
            title: 'Login',
            url: '/login',
            icon: 'log-in'
        },
        {
            title: 'Registration',
            url: '/registration',
            icon: 'finger-print' //list-box
        },        
        {
            title: 'Volunteers settings',
            url: '/volunteers-settings',
            icon: 'settings'
        },        
        {
            title: 'Organizations settings',
            url: '/organizations-settings',
            icon: 'settings'
        },
        {
            title: 'Organizations',
            url: '/organizations',
            icon: 'briefcase'
        },
        {
            title: 'Projects',
            url: '/projects',
            icon: 'filing'
        },
        {
            title: 'Saved projects',
            url: '/projects/type/saved',
            icon: 'bookmarks'
        },
        {
            title: 'Selected projects',
            url: '/projects/type/selected',
            icon: 'checkmark-circle-outline'
        },
        {
            title: 'New project',
            url: '/new-project',
            icon: 'hand'
        },
        {
            title: 'Project edit',
            url: '/project-edit',
            icon: 'create'
        },        
        {
            title:'Volunteers 1',
            url:'/volunteers/project/1',
            icon: 'star'
        },
        {
            title:'Volunteers 2',
            url:'/volunteers/project/2',
            icon: 'star'
        },
        {
            title:'Volunteers 3',
            url:'/volunteers/project/3',
            icon: 'star'
        },
        {
            title: 'Calendar',
            url: '/calendar',
            icon: 'calendar'
        },
        {
            title: 'About us',
            url: '/about',
            icon: 'help'
        },
        {
            title: 'Privacy policy',
            url: '/privacy',
            icon: 'at'
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
