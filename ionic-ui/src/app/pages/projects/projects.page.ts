import {Component, OnInit, OnDestroy} from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectsService} from '../../services/projects.service';
import {NavController} from '@ionic/angular';
import {Objects} from '../../constants/Objects';
import {Strings} from '../../constants/Strings';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { strict } from 'assert';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.page.html',
    styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit, OnDestroy {

    public searchTerm = '';
    public archive = false;
    projects: Project[] = Objects.Test_Projects;
    projectsFiltered: Project[] = this.projects;
    private dateNow = new Date();
    private type: String;
    private subscription: Subscription;

    constructor(private projectsService: ProjectsService, private navCtrl: NavController, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.type = this.route.snapshot.params['type'];
        this.loadItemsByType();
        this.filterNewItems();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadItemsByType() {
        let observable: Observable<Project[]>;
        switch (this.type) {
            case 'saved':
            observable = this.projectsService.getSavedItems();
            break;
            case 'selected':
            observable = this.projectsService.getSelectedItems();
            break;
            default:
            observable = this.projectsService.get();
            break;
        }
        this.subscription = this.subscribeProjects(observable);
    }

    subscribeProjects(observable: Observable<Project[]>) {
        return observable.subscribe(items => {
            this.projects = items.map(value => {
                if (value.imageUrl === null || value.imageUrl === '') {
                    value.imageUrl = Strings.Default_Image_Url;
                    return value;
                }
                return value;
            });
            this.filterNewItems();
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
                return new Date(value.end) < now;
            } else {
                return new Date(value.end) >= now;
            }
        });
        console.log(this.projectsFiltered);
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
