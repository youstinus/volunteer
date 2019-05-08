import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {UsersService} from '../../services/users.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    private role: number = 4;
   
    public pages = [        
        {
            title: 'Main',
            url: '/main',
            icon: 'home',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'Organizations',
            url: '/organizations',
            icon: 'briefcase',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'Projects',
            url: '/projects',
            icon: 'filing',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'Saved projects',
            url: '/projects/type/saved',
            icon: 'bookmarks',
            roles: [0, 1, 2]
        },
        {
            title: 'Selected projects',
            url: '/projects/type/selected',
            icon: 'checkmark-circle-outline',
            roles: [0, 1, 2]
        },
        {
            title: 'Created projects',
            url: '/projects/type/created',
            icon: 'checkmark-circle-outline',
            roles: [0, 1, 3]
        },
        {
            title: 'New project',
            url: '/new-project',
            icon: 'hand',
            roles: [0, 1, 3]
        },
        {
            title: 'Calendar',
            url: '/calendar',
            icon: 'calendar',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'About us',
            url: '/about',
            icon: 'help',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'Privacy policy',
            url: '/privacy',
            icon: 'at',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: 'Login',
            url: '/login',
            icon: 'log-in',
            roles: [4]
        },
        {
            title: 'Registration',
            url: '/registration',
            icon: 'finger-print',
            roles: [4] //list-box
        },        
        {
            title: 'Settings',
            url: '/volunteers-settings',
            icon: 'settings',
            roles: [2]
        },        
        {
            title: 'Settings',
            url: '/organizations-settings',
            icon: 'settings',
            roles: [3]
        }
    ];

    selectedPath = '';

    constructor(private router: Router, private usersService: UsersService, private navCtrl: NavController) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
            this.getRole();
        });
    }

    ngOnInit() {
        this.getRole();
    }

    getRole() {
        const role = this.usersService.getTokenRole();
        if (role == 'Volunteer') {
            this.role = 2;
        } else if (role == 'Organization') {
            this.role = 3;
        } else if (role == 'Moderator') {
            this.role = 1;            
        } else if (role == 'Admin') {
            this.role = 0;        
        } else {
            this.role = 4;
        }
    }

    check(i: number) {
        return this.pages[i].roles.indexOf(this.role) > -1;
    }

    checkLogout() {
        return this.role != 4;
    }

    logout() {
        console.log('logged out');
        this.usersService.logout();
        this.getRole();
        this.navCtrl.navigateRoot('main').catch(reason => console.log('Error rerouting menu'));
        //this.usersService.logout();
        //location.reload();
    }
}
