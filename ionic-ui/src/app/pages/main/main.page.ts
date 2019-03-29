import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Project} from '../../models/Project';
import {Organization} from '../../models/Organization';
import {Objects} from '../../constants/Objects';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    public threeProjects: Project[] = Objects.Three_Test_Projects;
    public threeOrganizations: Organization[] = Objects.Three_Test_Organizations;

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    onProjectClicked(project: Project) {
        this.navCtrl.navigateForward('projects/' + project.id).catch(reason => console.log(reason));
    }

    onOrganizationClicked(organization: Organization) {
        this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
    }
}
