import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Project} from '../../models/Project';
import {Organization} from '../../models/Organization';
import {Objects} from '../../constants/Objects';
import {Strings} from '../../constants/Strings';
import {ProjectsService} from '../../services/projects.service';
import {OrganizationsService} from '../../services/organizations.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    private projects: Project[] = Objects.Four_Test_Projects;
    private organizations: Organization[] = Objects.Four_Test_Organizations;
    public threeProjects: Project[];
    public threeOrganizations: Organization[];

    constructor(
        private navCtrl: NavController,
        private projectsService: ProjectsService,
        private organizationsService: OrganizationsService) {
    }

    ngOnInit() {
        this.getProjects();
        this.getOrganizations();
        this.filterNewProjects();
        this.filterNewOrganizations();
    }

    getProjects() {
        this.projectsService.get().subscribe(items => {
            this.projects = items.map(value => {
                if (value.imageUrl === null || value.imageUrl === '') {
                    value.imageUrl = Strings.Default_Image_Url;
                    return value;
                }
                return value;
            });
            this.filterNewProjects();
        }, error1 => {
            console.log(error1);
        });
    }

    getOrganizations() {
        this.organizationsService.get().subscribe(items => {
            this.organizations = items.map(value => {
                if (value.imageUrl === null || value.imageUrl === '') {
                    value.imageUrl = Strings.Default_Image_Url;
                    return value;
                }
                return value;
            });
            this.filterNewOrganizations();
        }, error1 => {
            console.log(error1);
        });
    }

    filterNewProjects() {
        this.threeProjects = this.projects.sort((n1, n2) => {
            if (n1.start > n2.start) {
                return 1;
            } else {
                return -1;
            }
        }).slice(0, 4);
    }

    filterNewOrganizations() {
        this.threeOrganizations = this.organizations.sort((n1, n2) => {
            if (n1.projectsIds !== null && n2.projectsIds !== null && n1.projectsIds.length > n2.projectsIds.length) {
                return 1;
            } else {
                return -1;
            }
        }).slice(0, 4);
    }

    onProjectClicked(project: Project) {
        this.navCtrl.navigateForward('projects/' + project.id).catch(reason => console.log(reason));
    }

    onOrganizationClicked(organization: Organization) {
        this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
    }
}
