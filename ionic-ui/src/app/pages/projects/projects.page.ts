import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { NavController, Events } from '@ionic/angular';
import { Strings } from '../../constants/Strings';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Language } from 'src/app/utilities/Language';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.page.html',
    styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit, OnDestroy {

    projectsTitle: string = Language.Lang.menuProjects;
    projectsSearch: string = Language.Lang.projectsSearch;
    projectsArchive: string = Language.Lang.projectsArchive;
    projectsNew: string = Language.Lang.projectsNew;

    public defaulUrl: string = Strings.Default_Image_Url3;
    public spin = true;
    public searchTerm = '';
    public archive = false;
    public projects: Project[];
    public projectsFiltered: Project[] = this.projects;
    private dateNow = new Date(Date.now());
    private type: String;
    private subscription: Subscription;
    private role: number = 4;

    constructor(
        private usersService: UsersService,
        private events: Events,
        private projectsService: ProjectsService,
        private navCtrl: NavController,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getRole();
        this.type = this.route.snapshot.params['type'];
        this.loadItemsByType();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadItemsByType() {
        let observable: Observable<Project[]>;
        switch (this.type) {
            case 'saved':
                if (this.role != 2) {
                    this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
                    break;
                }
                observable = this.projectsService.getSavedItems();
                break;
            case 'selected':
                if (this.role != 2) {
                    this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
                    break;
                }
                observable = this.projectsService.getSelectedItems();
                break;
            case 'created':
                if (this.role != 3) {
                    this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
                    break;
                }
                observable = this.projectsService.getCreatedItems();
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
            this.spin = false;
        }, error1 => {
            this.spin = false;
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
    }

    onProjectClicked(project: Project) {
        this.events.subscribe('user:updated', (onEditForm) => {
            // do something when updated data

            project.title = onEditForm.title;
            project.imageUrl = onEditForm.imageUrl;
            project.start = onEditForm.start;
            project.end = onEditForm.end;
        });
        this.events.subscribe('returnedFromEdit', () => {
            this.events.unsubscribe('user:updated');
            this.events.unsubscribe('returnedFromEdit');
        });
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

    updateUrl(project: Project) {
        project.imageUrl = Strings.Default_Image_Url;
    }

    getDateStyle(project: Project) {
        return project != null && new Date(project.start) < this.dateNow && new Date(project.end) > this.dateNow;
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
}
