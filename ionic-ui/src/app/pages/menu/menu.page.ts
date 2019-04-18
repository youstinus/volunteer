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
            url: '/main'
        },
        {
            title: 'Login',
            url: '/login'
        },
        {
            title: 'Registration',
            url: '/registration'
        },        
        {
            title: 'Volunteers settings',
            url: '/volunteers-settings'
        },        
        {
            title: 'Organizations settings',
            url: '/organizations-settings'
        },
        {
            title: 'Organizations',
            url: '/organizations'
        },
        {
            title: 'Projects',
            url: '/projects'
        },
        {
            title: 'Saved projects',
            url: '/projects/type/saved'
        },
        {
            title: 'Selected projects',
            url: '/projects/type/selected'
        },
        {
            title: 'New project',
            url: '/new-project'
        },
        {
            title: 'Project edit',
            url: '/project-edit'
        },        
        {
            title:'Volunteers 1',
            url:'/volunteers/project/1'
        },
        {
            title:'Volunteers 2',
            url:'/volunteers/project/2'
        },
        {
            title:'Volunteers 3',
            url:'/volunteers/project/3'
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
