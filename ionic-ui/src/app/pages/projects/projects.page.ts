import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectsService} from '../../services/projects.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: Project[];

  constructor(private projectsService: ProjectsService, private navCtrl: NavController) {
  }

  ngOnInit() {
     this.projectsService.getAll().subscribe(items => {
       this.projects = items;
     });
  }

  onProjectClicked(project: Project) {
    this.navCtrl.navigateForward('projects/' + project.id).catch(e => console.log(e));
  }
}
