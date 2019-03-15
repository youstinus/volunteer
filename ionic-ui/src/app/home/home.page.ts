import { Component } from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private projectsService: ProjectsService, private navCtrl: NavController) {
  }

  onProjects(){
    this.navCtrl.navigateForward('projects');
  }

  onLogin(){
    this.navCtrl.navigateForward('login');
  }

  onRegister(){
    this.navCtrl.navigateForward('registration');
  }
  onOrganization(){
    this.navCtrl.navigateForward('organization');
  }
  onOrganizations(){
    this.navCtrl.navigateForward('organizations');
  }
}
