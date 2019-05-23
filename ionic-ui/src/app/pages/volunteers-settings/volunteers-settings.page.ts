import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../models/Volunteer';
import { VolunteersService } from '../../services/volunteers.service';
import { UsersService } from '../../services/users.service';
import { NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Language } from 'src/app/utilities/Language';
import { Strings } from 'src/app/constants/Strings';
import { ToastService } from 'src/app/shared/toast.service';

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
    volSettingsCannotGetVolunteer: string = Language.Lang.volSettingsCannotGetVolunteer;
    orgSettingsDeleteAalert: string = Language.Lang.orgSettingsDeleteAalert;
    orgSettingsDeleteConfirm: string = Language.Lang.orgSettingsDeleteConfirm;
    orgSettingsDeleteButton: string = Language.Lang.orgSettingsDeleteButton;
    orgSettingsAlertConfirm: string = Language.Lang.orgSettingsAlertConfirm;
    orgSettingsDeleteCancel: string = Language.Lang.orgSettingsDeleteCancel;
    orgSettingsDeleted: string = Language.Lang.orgSettingsDeleted;

    user: number;
    public onSaveForm: FormGroup;
    volunteer: Volunteer = new Volunteer();
    defaulUrl: string = Strings.Default_Image_Url3;
    role: number = 4;

    constructor(
        public toastCtrl: ToastController,
        private volunteersService: VolunteersService,
        private usersService: UsersService,
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private toastService: ToastService
    ) {
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

        this.getRole();
        if (this.role != 2) {
            this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
        }

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
            this.toastService.presentToast(this.volSettingsCannotGetVolunteer, Strings.Color_Success);
        });
    }

    saveVolunteer() {
        this.volunteersService.update(this.volunteer.id, this.onSaveForm.value).subscribe(value => {
            this.toastService.presentToast(this.volSettingsAlertSuccess, Strings.Color_Success);
        }, error1 => {
            this.toastService.presentToast(this.volSettingsAlertFail, Strings.Color_Danger);
        });
    }

    onSearchChange(searchValue: string) {
        this.updateIMG(searchValue);
    }

    updateIMG(searchValue: string) {
        this.volunteer.imageUrl = searchValue;
    }

    updateUrl(event) {
        this.volunteer.imageUrl = this.defaulUrl;
    }

    onChangePass() {
        this.navCtrl.navigateForward('change-password/').catch(reason => console.log(reason));
    }

    async onDelete() {
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
            this.usersService.logout();
            console.log("Volunteer deleted");
        }, error1 => {
            console.log(error1);
        });
    }

    getRole() {
        const role = this.usersService.getTokenRole();
        if (role == 'Volunteer') {
            this.role = 2;
        } else if (role == 'Organization') {
            this.role = 3;
        } else if (role == 'Moderator') {
            this.role = 1;
        } else if (role == 'Admin') {
            this.role = 0;
        } else {
            this.role = 4;
        }
    }
}
