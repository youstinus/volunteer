import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationsService} from '../../services/organizations.service';
import {NavController} from '@ionic/angular';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { Strings } from '../../constants/Strings';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  organizationsx: Organization[] =
      [
        {
          id: 11,
          projectsIds: [1],
          title: 'Pam param , yeet skeet',
          description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
          website: 'google.com',
          userId: 5,
          phone: '866666666',
          picturesIds: [1],
          address: 'test g. 696',
          email: 'test@gmail.com',
          imageUrl: 'https://rarepepewallet.com/images/pepemoney.png'
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
          address: 'test g. 696',
          email: 'test@gmail.com',
          imageUrl: 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg'
        }



  ]

  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
  public spin = true;
  public searchTerm = '';
  organizations: Organization[];
  organizationsFiltered: Organization[] = this.organizations;


  constructor(private organizationsService: OrganizationsService, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.organizationsService.get().subscribe(items => {
      this.organizations = items;
      this.spin = false;

    }, error1 => {
      console.log(error1);
    });
  }




  onOrganizationClicked(organization: Organization) {
    this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
  }
  updateUrl(organization: Organization) {
    organization.imageUrl = Strings.Default_Image_Url;//this.defaulUrl;
  }

  // setFilteredItems() {
  //   this.organizationsFiltered = this.filteredOrganizations(this.searchTerm);
  // }
  //
  // filteredOrganizations(searchTerm: string) {
  //   if (searchTerm === '') {
  //
  //     return this.organizationsFiltered;
  //   }
  //
  //   return this.organizationsFiltered.filter(item => {
  //     const byTitle = item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //     return byTitle;
  //   });
  // }


}
