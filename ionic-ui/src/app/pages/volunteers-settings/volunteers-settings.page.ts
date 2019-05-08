import {Component, OnInit} from '@angular/core';
import {Volunteer} from '../../models/Volunteer';
import {VolunteersService} from '../../services/volunteers.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {UsersService} from '../../services/users.service';
import {NavController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-volunteers-settings',
    templateUrl: './volunteers-settings.page.html',
    styleUrls: ['./volunteers-settings.page.scss'],
})
export class VolunteersSettingsPage implements OnInit {

    user: number;
    public onSaveForm: FormGroup;
    volunteer: Volunteer = new Volunteer();

    constructor(
        private volunteersService: VolunteersService,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.onSaveForm = this.formBuilder.group({
            'imageUrl': [null, Validators.nullValidator],
            'firstName':[null, Validators.nullValidator],
            'lastName': [null, Validators.nullValidator],
            'phone': [null, Validators.nullValidator],
            'email': [null, Validators.nullValidator],
            'description': [null, Validators.nullValidator],
            'userId':this.usersService.getTokenId()
          });
        this.user = this.usersService.getTokenId();
        if (this.user === null) {
            this.navCtrl.navigateRoot('main').catch(e => console.log(e));
        }

        this.loadVolunteer();
    }

    loadVolunteer() {
        this.volunteersService.getByUsersId(this.user).subscribe(value => {
            this.volunteer = value;
        }, error1 => {
            console.log('Cannot get volunteer from database', error1);
        });
    }

    saveVolunteer() {
        console.log(this.onSaveForm.value);
        this.volunteersService.update(this.volunteer.id,this.onSaveForm.value).subscribe(value => {
            console.log('Volunteer was updated successfully');
            console.log(value);

        }, error1 => {
            console.log('Volunteer was not updated', error1);
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
                        this.volunteer.imageUrl = data.URL;
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
