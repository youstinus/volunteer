import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/Organization';
import { OrganizationsService } from '../../services/organizations.service';
import { UsersService } from '../../services/users.service';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language } from '../../utilities/Language';
import { Strings } from 'src/app/constants/Strings';

@Component({
    selector: 'app-organizations-settings',
    templateUrl: './organizations-settings.page.html',
    styleUrls: ['./organizations-settings.page.scss'],
})

export class OrganizationsSettingsPage implements OnInit {

    orgSettingsHeader: string = Language.Lang.orgSettingsHeader;
    orgSettingsImage: string = Language.Lang.orgSettingsImage;
    orgSettingsWebsite: string = Language.Lang.orgSettingsWebsite;
    orgSettingsTitle: string = Language.Lang.orgSettingsTitle;
    orgSettingsAddress: string = Language.Lang.orgSettingsAddress;
    orgSettingsPhone: string = Language.Lang.orgSettingsPhone;
    orgSettingsDescription: string = Language.Lang.orgSettingsDescription;
    orgSettingsSaveChanges: string = Language.Lang.orgSettingsSaveChanges;
    orgSettingsChangePass: string = Language.Lang.orgSettingsChangePass;
    orgSettingsDeleteAcc: string = Language.Lang.orgSettingsDeleteAcc;
    orgSettingsDeleteAalert: string = Language.Lang.orgSettingsDeleteAalert;
    orgSettingsDeleteConfirm: string = Language.Lang.orgSettingsDeleteConfirm;
    orgSettingsDeleteButton: string = Language.Lang.orgSettingsDeleteButton;
    orgSettingsAlertConfirm: string = Language.Lang.orgSettingsAlertConfirm;
    orgSettingsDeleteCancel: string = Language.Lang.orgSettingsDeleteCancel;
    orgSettingsDeleted: string = Language.Lang.orgSettingsDeleted;

    user: number;
    public onSaveForm: FormGroup;
    organization: Organization = new Organization();
    defaulUrl: string = Strings.Default_Image_Url3;

    constructor(
        private organizationService: OrganizationsService,
        private usersService: UsersService,
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController) {
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
        this.organizationService.getByUserId(this.user).subscribe(value => {
            this.organization = value;
        }, error1 => {
            console.log('Cannot get organization from database', error1);
        });
    }

    saveOrganization() {
        this.organizationService.update(this.organization.id, this.onSaveForm.value).subscribe(value => {
            console.log('Organization was updated successfully');

        }, error1 => {
            console.log('Organization was not updated', error1);
        });
    }

    onSearchChange(searchValue: string) {
        this.updateIMG(searchValue);
    }

    updateIMG(searchValue: string) {
        this.organization.imageUrl = searchValue;
    }

    updateUrl(event) {
        this.organization.imageUrl = this.defaulUrl;
    }

    onChangePass() {
        this.navCtrl.navigateForward('change-password').catch(reason => console.log(reason));
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
            console.log("Organization deleted");
        }, error1 => {
            console.log(error1);
        });
    }
}












