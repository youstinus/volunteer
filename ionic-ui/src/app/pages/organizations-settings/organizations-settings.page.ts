import { Component, OnInit } from '@angular/core';
import {Organization} from "../../models/Organization";
import {OrganizationsService} from "../../services/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from '../../services/users.service';
import {AlertController, NavController} from '@ionic/angular';
import {User} from "../../models/User";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Volunteer} from "../../models/Volunteer";
import {VolunteersService} from "../../services/volunteers.service";
import {Strings} from "../../constants/Strings";

@Component({
  selector: 'app-organizations-settings',
  templateUrl: './organizations-settings.page.html',
  styleUrls: ['./organizations-settings.page.scss'],
})


export class OrganizationsSettingsPage implements OnInit {

  user: number;
  public onSaveForm: FormGroup;
  organization: Organization = new Organization();
  defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';

  constructor(
      private organizationService: OrganizationsService,
      private route: ActivatedRoute,
      private usersService: UsersService,
      private navCtrl: NavController,
      private formBuilder: FormBuilder,
      public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.onSaveForm = this.formBuilder.group({
      'imageUrl': [null, Validators.nullValidator],
      'title': [null, Validators.nullValidator],
      'address': [null, Validators.nullValidator],
      'phone': [null, Validators.nullValidator],
      'website': [null, Validators.nullValidator],
      'description': [null, Validators.nullValidator],
      'userId': this.usersService.getTokenId()
    });
    this.user = this.usersService.getTokenId();
    if (this.user === null) {
      this.navCtrl.navigateRoot('main').catch(e => console.log(e));
    }

    this.loadOrganization();
  }

  loadOrganization() {
    this.organizationService.getByOrganizationId(this.user).subscribe(value => {
      this.organization = value;
    }, error1 => {
      console.log('Cannot get organization from database', error1);
    });
  }

  saveOrganization() {
    console.log(this.onSaveForm.value);
    this.organizationService.update(this.organization.id, this.onSaveForm.value).subscribe(value => {
      console.log('Organization was updated successfully');
      console.log(value);

    }, error1 => {
      console.log('Organization was not updated', error1);
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
      inputs: [
        {
          name: 'URL',
          type: 'text',
          placeholder: ''
        }
      ]
    });

    await alert.present();
  }

  onSearchChange(searchValue: string) {
    this.updateIMG(searchValue);
  }
  updateIMG(searchValue: string) {
    this.organization.imageUrl = Strings.Default_Image_Url;//Strings.Default_Image_Url;//searchValue;
  }
  updateUrl(event) {
    this.organization.imageUrl = this.defaulUrl;
  }
  onChangePass()
  {
    this.navCtrl.navigateForward('/change-password').catch(reason => console.log(reason));
  }

}












