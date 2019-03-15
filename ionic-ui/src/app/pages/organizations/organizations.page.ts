import { Component, OnInit } from '@angular/core';
import {Organization} from "../../models/Organization";
import {OrganizationsService} from "../../services/organizations.service";
import {NavController} from "@ionic/angular";


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  private organizations: Organization[] =
      [
        {
          id: 11,
          projectsIds: [1],
          title: 'VšĮ Pagirk',
          description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
          website: 'google.com',
          userId: 5,
          phone: '866666666',
          picturesIds: [1],
          address: 'test g. 696'
        },
        {
          id: 12,
          projectsIds: [2],
          title: 'VšĮ Pagirk',
          description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
          website: 'google.com',
          userId: 5,
          phone: '866666666',
          picturesIds: [1],
          address: 'test g. 696'
        }



  ]


  constructor(private organizationsService: OrganizationsService, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.organizationsService.getAll().subscribe(items => {
      this.organizations = items;
      //console.log(this.projects, this.projects2);
    });
  }

  onOrganizationClicked(organization: Organization) {
    this.navCtrl.navigateForward('organization/' + organization.id);
  }
}
