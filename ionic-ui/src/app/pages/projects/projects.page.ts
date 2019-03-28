import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectsService} from '../../services/projects.service';
import {NavController} from '@ionic/angular';
import {Objects} from '../../constants/Objects';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.page.html',
    styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

    public searchTerm = '';
    public archive = false;
    projects: Project[] = Objects.Test_Projects;
    projectsFiltered: Project[] = this.projects;
    private dateNow = new Date(Date.now());

    constructor(private projectsService: ProjectsService, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.getItems();
        this.filterNewItems();
    }

    getItems() {
        this.projectsService.get().subscribe(items => {
            this.projects = items;
        }, error1 => {
            console.log(error1);
        });
    }

    filterNewItems() {
        this.projectsFiltered = this.projects.sort((n1, n2) => {
            if (n1.start > n2.start) {
                return 1;
            } else {
                return -1;
            }
        }).filter(value => {
            const now = new Date(Date.now());
            if (this.archive) {
                return value.end < now;
            } else {
                return value.end >= now;
            }
        });
    }

    onProjectClicked(project: Project) {
        this.navCtrl.navigateForward('projects/' + project.id).catch(e => console.log(e));
    }

    setFilteredItems() {
        this.projectsFiltered = this.filterProjects(this.searchTerm);
    }

    filterProjects(searchTerm: string) {
        if (searchTerm === '') {
            this.filterNewItems();
            return this.projectsFiltered;
        }

        return this.projectsFiltered.filter(item => {
            const byTitle = item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            if (byTitle === false) {
                return item.start.toLocaleDateString('lt-lt').indexOf(searchTerm.toLowerCase()) > -1;
            }
            return byTitle;
        });
    }

    toggleArchive() {
        this.archive = !this.archive;
        this.filterNewItems();
    }

    checkDate(project: Project) {
        return project.end >= this.dateNow && project.start <= this.dateNow;
    }
}
