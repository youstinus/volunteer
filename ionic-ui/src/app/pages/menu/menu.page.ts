import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { NavController, Platform } from '@ionic/angular';
import { Language } from 'src/app/utilities/Language';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    private role = 4;
    menuMenu: string = Language.Lang.menuMenu;
    menuLogout: string = Language.Lang.menuLogout;
    menuExit: string = Language.Lang.menuExit;
    desktop = true;

    public pages = [
        {
            title: Language.Lang.menuMain,
            url: '/main',
            icon: 'home',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuOrganizations,
            url: '/organizations',
            icon: 'briefcase',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuProjects,
            url: '/projects',
            icon: 'filing',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuSavedProjects,
            url: '/projects/type/saved',
            icon: 'bookmarks',
            roles: [0, 1, 2]
        },
        {
            title: Language.Lang.menuSelectedProjects,
            url: '/projects/type/selected',
            icon: 'checkmark-circle-outline',
            roles: [0, 1, 2]
        },
        {
            title: Language.Lang.menuCreatedProjects,
            url: '/projects/type/created',
            icon: 'checkmark-circle-outline',
            roles: [0, 1, 3]
        },
        {
            title: Language.Lang.menuNewProject,
            url: '/new-project',
            icon: 'hand',
            roles: [0, 1, 3]
        },
        {
            title: Language.Lang.menuCalendar,
            url: '/calendar',
            icon: 'calendar',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuAboutUs,
            url: '/about',
            icon: 'help',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuPrivacyPolicy,
            url: '/privacy',
            icon: 'at',
            roles: [0, 1, 2, 3, 4]
        },
        {
            title: Language.Lang.menuLogin,
            url: '/login',
            icon: 'log-in',
            roles: [4]
        },
        {
            title: Language.Lang.menuRegistration,
            url: '/registration',
            icon: 'finger-print',
            roles: [4]
        },
        {
            title: Language.Lang.menuSettings,
            url: '/volunteers-settings',
            icon: 'settings',
            roles: [2]
        },
        {
            title: Language.Lang.menuSettings,
            url: '/organizations-settings',
            icon: 'settings',
            roles: [3]
        }
    ];

    selectedPath = '';

    constructor(private router: Router, private usersService: UsersService, private navCtrl: NavController, private platform: Platform) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
            this.getRole();
        }, (error) => {
            console.log(error);
        });
    }

    ngOnInit() {
        this.getRole();
        this.getPlatform();
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
        this.usersService.logout();
        this.getRole();
        this.navCtrl.navigateRoot('main').catch(reason => console.log('Error rerouting menu'));
    }

    getPlatform() {
        if (this.platform.is('desktop')) {
            this.desktop = true;
        } else if (this.platform.is('ios') || this.platform.is('android')) {
            this.desktop = false;
        }
    }

    exitApp() {
        navigator['app'].exitApp();
    }
}
