import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../services/organizations.service';
import {Project} from '../../models/Project';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  organization: Organization = {
    id: 11,
    projectsIds: [1],
    title: 'VšĮ Pagirk',
    description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
    website: 'google.com',
    userId: 5,
    phone: '866666666',
    picturesIds: [1],
    address : 'test g. 696',
    email: 'test@gmail.com',
    imageUrl: ''
  };

  projects: Project[];

  constructor(private organizationsService: OrganizationsService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.organizationsService.getById(id).subscribe(value => {
      this.organization = value;
    }, error1 => {
      console.log(error1);
    });

    this.organizationsService.getProjectsByOrganizationId(id).subscribe(value => {
      this.projects = value;
    }, error1 => {
      console.log(error1);
    });
  }

  // consider transfering whole object to project page to reduce time
  onProjectClicked(id: number) {
    this.navCtrl.navigateForward('projects/' + id).catch(reason => console.log(reason));
  }
}


