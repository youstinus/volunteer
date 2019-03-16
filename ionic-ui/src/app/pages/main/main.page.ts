import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    onProjects() {
        this.navCtrl.navigateForward('projects');
    }

    onLogin() {
        this.navCtrl.navigateForward('login');
    }

    onRegister() {
        this.navCtrl.navigateForward('registration');
    }

    onOrganization() {
        this.navCtrl.navigateForward('organizations/1');
    }

    onOrganizations() {
        this.navCtrl.navigateForward('organizations');
    }
}
