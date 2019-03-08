import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  private project: Project = {id: 1,
     title: 'VšĮ Pagirk',
   description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
   email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'};
}
