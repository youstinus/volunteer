import { Component, OnInit } from '@angular/core';
import {Organization} from "../../models/Organization";
import {OrganizationsService} from "../../services/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from '../../services/users.service';
import {NavController} from "@ionic/angular";
import {User} from "../../models/User";

@Component({
  selector: 'app-organizations-settings',
  templateUrl: './organizations-settings.page.html',
  styleUrls: ['./organizations-settings.page.scss'],
})


export class OrganizationsSettingsPage implements OnInit {
  user: User;
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

  constructor(private organizationsService: OrganizationsService,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.user = this.usersService.getUser();
    if (this.organization === null) {
      this.navCtrl.navigateRoot('main').catch(e => console.log(e));
    }

    this.loadOrganization();
  }
  saveOrganization() {
    this.organizationsService.update(this.organization.id, this.organization).subscribe(value => {
      console.log('Organization was updated successfully');
      console.log(value);

    }, error1 => {
      console.log('Organization was not updated', error1);
    });
  }

  loadOrganization() {
    this.organizationsService.getByOrganizationId(this.organization.id).subscribe(value => {
      this.organization = value;
    }, error1 => {
      console.log('Cannot get organization from database', error1);
    });
  }


  }


// getImage()
// {
//   const options : CameraOptions = {
//     quality: 100,
//     destinationType : this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
//   }
//
//   this.camera.getImage(options).then((imageData) => {
//     this.base64Image = 'data:image/jpeg;base64,' + imageData;
//   }, (err) => {
//   });

//}









