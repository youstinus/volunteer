import { Component, OnInit } from '@angular/core';
import {Organization} from "../../models/Organization";
import {OrganizationsService} from "../../services/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from '../../services/users.service';
import {AlertController, NavController} from '@ionic/angular';
import {User} from "../../models/User";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizations-settings',
  templateUrl: './organizations-settings.page.html',
  styleUrls: ['./organizations-settings.page.scss'],
})


export class OrganizationsSettingsPage implements OnInit {
  public imgForm: FormGroup;
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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq1Qu_U_0Phe8tE6ffGJ9Zc7SmnWq8mO3DgL3rpmwV57D7iAUjMQ'
  };

  constructor(private organizationsService: OrganizationsService,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              ) { }

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
  onChangePic() {
    console.log();
  this.changePic();
  }
  async changePic() {
    const alert = await this.alertCtrl.create({
      header: 'Please enter the url of your image',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: data => {
            console.log('Confirm');
            this.organization.imageUrl = data.URL;
          }
        }
      ],
      inputs : [
        {
          name: 'URL',
          type: 'text',
          placeholder: ''
        }
       ]
    });

    await alert.present();
  }

  }












