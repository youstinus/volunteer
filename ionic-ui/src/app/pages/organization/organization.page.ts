import { Component, OnInit } from '@angular/core';
import {Organization} from "../../models/Organization";
import {ProjectsService} from '../../services/projects.service';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../services/organizations.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  constructor(private organizationsService: OrganizationsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.organizationsService.getById(id).subscribe(value => {
      this.organization = value;
    }, error1 => {
      console.log(error1);
    });
  }

  private organization: Organization = {
    id: 11,
    projectsIds: [1],
    title: 'VšĮ Pagirk',
    description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
    website: 'google.com',
    userId: 5,
    phone: '866666666',
    picturesIds: [1],
    address : 'test g. 696',
email: 'test@gmail.com'

  };
}


