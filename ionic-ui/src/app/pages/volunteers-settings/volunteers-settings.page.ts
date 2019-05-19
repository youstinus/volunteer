import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../models/Volunteer';
import { VolunteersService } from '../../services/volunteers.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Strings } from 'src/app/constants/Strings';
import { Language } from 'src/app/utilities/Language';

@Component({
    selector: 'app-volunteers-settings',
    templateUrl: './volunteers-settings.page.html',
    styleUrls: ['./volunteers-settings.page.scss'],
})
export class VolunteersSettingsPage implements OnInit {

    volSettingsHeader: string = Language.Lang.volSettingsHeader;
    volSettingsImage: string = Language.Lang.volSettingsImage;
    volSettingsName: string = Language.Lang.volSettingsName;
    volSettingsLastName: string = Language.Lang.volSettingsLastName;
    volSettingsPhone: string = Language.Lang.volSettingsPhone;
    volSettingsEmail: string = Language.Lang.volSettingsEmail;
    volSettingsDescription: string = Language.Lang.volSettingsDescription;
    volSettingsSaveChanges: string = Language.Lang.volSettingsSaveChanges;
    volSettingsAlertSuccess: string = Language.Lang.volSettingsAlertSuccess;
    volSettingsAlertFail: string = Language.Lang.volSettingsAlertFail;
    volSettingsChangePass: string = Language.Lang.volSettingsChangePass;
    volSettingsDeleteAcc: string = Language.Lang.volSettingsDeleteAcc;
    orgSettingsDeleteAalert: string = Language.Lang.orgSettingsDeleteAalert;
    orgSettingsDeleteConfirm: string = Language.Lang.orgSettingsDeleteConfirm;
    orgSettingsDeleteButton: string = Language.Lang.orgSettingsDeleteButton;
    orgSettingsAlertConfirm: string = Language.Lang.orgSettingsAlertConfirm;
    orgSettingsDeleteCancel: string = Language.Lang.orgSettingsDeleteCancel;
    orgSettingsDeleted: string = Language.Lang.orgSettingsDeleted;


    user: number;
    public onSaveForm: FormGroup;
    volunteer: Volunteer = new Volunteer();
    defaulUrl: string = 'https://cdn.80000hours.org/wp-content/uploads/2012/11/AAEAAQAAAAAAAAUbAAAAJDZiMjcxZmViLTNkMzItNDhlNi1hZDg4LWM5NzI3MzA4NjMxYg.jpg';

    constructor(
        public toastCtrl: ToastController,
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
            'firstName': [null, Validators.nullValidator],
            'lastName': [null, Validators.nullValidator],
            'phone': [null, Validators.nullValidator],
            'email': [null, Validators.nullValidator],
            'description': [null, Validators.nullValidator],
            'userId': this.usersService.getTokenId()
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
        this.volunteersService.update(this.volunteer.id, this.onSaveForm.value).subscribe(value => {
            console.log(value);
            this.presentSToast();
        }, error1 => {
            this.presentFToast();
            console.log(error1);
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
        this.volunteer.imageUrl = searchValue;//Strings.Default_Image_Url;//
    }

    updateUrl(event) {
        this.volunteer.imageUrl = this.defaulUrl;
    }

    onChangePass() {
        this.navCtrl.navigateForward('change-password/').catch(reason => console.log(reason));
    }

    async presentSToast() {
        const toast = await this.toastCtrl.create({
            message: this.volSettingsAlertSuccess,
            duration: 2500,
            position: 'bottom',
            color: 'success',
            cssClass: "toast",
            translucent: true,
            buttons: [
                {
                    text: Language.Lang.toastClose,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    async presentFToast() {
        const toast = await this.toastCtrl.create({
            message: this.volSettingsAlertFail,
            duration: 2500,
            cssClass: "toast",
            position: 'bottom',
            color: 'danger',
            translucent: true,
            buttons: [
                {
                    text: Language.Lang.toastClose,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    onDelete() {
        console.log();
        this.delete();
    }

    async delete() {
        const alert = await this.alertCtrl.create({
            header: this.orgSettingsDeleteAalert,
            message: this.orgSettingsDeleteConfirm,
            buttons: [
                {
                    text: this.orgSettingsDeleteButton,
                    role: 'delete',
                    cssClass: '',
                    handler: data => {
                        {
                            console.log('Confirm');
                            this.deleteUser();
                            console.log(this.user);
                            this.conf();
                        }
                    }
                }, {
                    text: this.orgSettingsDeleteCancel,
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                },
            ],

        });

        await alert.present();
    }

    Confirm() {
        console.log();
        this.conf();
    }

    async conf() {
        const alert = await this.alertCtrl.create({
            header: this.orgSettingsDeleted,
            buttons: [
                {
                    text: this.orgSettingsAlertConfirm,
                    role: 'Ok',
                    cssClass: 'btn',
                    handler: data => {
                        {
                            console.log('Confirm');
                            this.navCtrl.navigateRoot('main').catch(reason => console.log(reason));

                        }
                    }
                }
            ],

        });

        await alert.present();
    }


    deleteUser() {
        this.usersService.delete(this.user).subscribe(value => {
            console.log(value)

        });

    }


}
