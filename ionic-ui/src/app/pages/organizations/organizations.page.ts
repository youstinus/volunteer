import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationsService} from '../../services/organizations.service';
import {NavController} from '@ionic/angular';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { Strings } from '../../constants/Strings';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {Review} from '../../models/Review';
import {ReviewsService} from '../../services/reviews.service';
import {Language} from "../../utilities/Language";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  orgsHeader: string = Language.Lang.orgsHeader;





  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';
  public spin = true;
  public searchTerm = '';
  organizations: Organization[];
  // organizationsFiltered: Organization[] = this.organizations;


  constructor(private organizationsService: OrganizationsService, private navCtrl: NavController, private reviewsService: ReviewsService) {
  }

  ngOnInit() {
    this.organizationsService.get().subscribe(items => {
      this.organizations = items;
      this.spin = false;

    }, error1 => {
      console.log(error1);
      // });
      // this.reviewsService.getReviews(id).subscribe(value => {
      //   this.reviews = value;
      //   this.reviews.map(value1 => value1.organizationId === this.organization.id);
      // }, error1 => {
      //   console.log(error1);
    });
  }




  onOrganizationClicked(organization: Organization) {
    this.navCtrl.navigateForward('organizations/' + organization.id).catch(reason => console.log(reason));
  }
  updateUrl(organization: Organization) {
    organization.imageUrl = Strings.Default_Image_Url;//this.defaulUrl;
  }

  // getAverage() {
  //   const sum = this.reviews.filter(item => item.grade && item.organizationId === this.organization.id)
  //       .reduce((sum, current) => sum + current.grade, 0);
  //
  //   const count = this.reviews.filter((x) => { return x.organizationId === this.organization.id; });
  //   var lngth = count.length;
  //   return sum / lngth;
  // }


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
