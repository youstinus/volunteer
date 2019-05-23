import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Project } from '../../models/Project';
import { Organization } from '../../models/Organization';
import { Strings } from '../../constants/Strings';
import { ProjectsService } from '../../services/projects.service';
import { OrganizationsService } from '../../services/organizations.service';
import { Language } from 'src/app/utilities/Language';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    mainTitle: string = Language.Lang.mainTitle;
    mainEvents: string = Language.Lang.mainEvents;
    mainWantedOrganizations: string = Language.Lang.mainWantedOrganizations;
    mainIntroVideo: string = Language.Lang.mainIntroVideo;
    mainStart: string = Language.Lang.mainStart;

    public isMobile = false;
    public popularProjects: Project[];
    public popularOrganizations: Organization[];
    public spin = false;
    public videoId = Strings.Youtube_Video_Id;
    private player;
    private ytEvent;
    private projects: Project[];
    private organizations: Organization[];


    constructor(
        private navCtrl: NavController,
        private projectsService: ProjectsService,
        private organizationsService: OrganizationsService,
    ) { }

    ngOnInit() {
        this.isMobile = this.getIsMobile();
        this.getProjects();
        this.getOrganizations();
    }

    getIsMobile(): boolean {
        const w = document.documentElement.clientWidth;
        const breakpoint = 1400;
        if (w < breakpoint) {
            return true;
        } else {
            return false;
        }
    }

    onResize() {
        this.isMobile = this.getIsMobile();
    }

    onStateChange(event) {
        this.ytEvent = event.data;
    }

    savePlayer(player) {
        this.player = player;
    }

    playVideo() {
        this.player.playVideo();
    }

    pauseVideo() {
        this.player.pauseVideo();
    }

    getProjects() {
        this.projectsService.getPopular().subscribe(items => {
            this.projects = items.map(value => {
                if (value.imageUrl === null || value.imageUrl === '') {
                    value.imageUrl = Strings.Default_Image_Url;
                    return value;
                }
                return value;
            });
            this.popularProjects = this.projects;
        }, error1 => {
            this.spin = false;
        });
    }

    getOrganizations() {
        this.organizationsService.getPopular().subscribe(items => {
            this.organizations = items.map(value => {
                if (value.imageUrl === null || value.imageUrl === '') {
                    value.imageUrl = Strings.Default_Image_Url;
                    return value;
                }
                return value;
            });
            this.popularOrganizations = this.organizations;
            this.spin = false;
        }, error1 => {
            this.spin = false;
        });
    }

    onProjectClicked(project: Project) {
        this.navCtrl.navigateForward('projects/' + project.id).catch(reason => console.log(reason));
    }

    onOrganizationClicked(organization: Organization) {
        this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
    }
}
