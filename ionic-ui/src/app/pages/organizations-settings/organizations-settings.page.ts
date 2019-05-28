import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/Organization';
import { OrganizationsService } from '../../services/organizations.service';
import { UsersService } from '../../services/users.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language } from '../../utilities/Language';
import { Strings } from 'src/app/constants/Strings';
import { ToastService } from 'src/app/shared/toast.service';

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
    orgSettingsEmail: string = Language.Lang.orgSettingsEmail;
    orgSettingsCannotGetOrganization: string = Language.Lang.orgSettingsCannotGetOrganization;
    volSettingsAlertSuccess: string = Language.Lang.volSettingsAlertSuccess;
    volSettingsAlertFail: string = Language.Lang.volSettingsAlertFail;
    orgRequiredField3: string = Language.Lang.orgRequiredField3;
    orgRequiredEmail: string = Language.Lang.orgRequiredEmail;
    orgCaution: string = Language.Lang.orgCaution;
    orgSuccessUpdate: string = Language.Lang.orgSuccessUpdate;
    orgFailUpdate: string = Language.Lang.orgFailUpdate;
    
    caution: string="Pavadinimo, nuotraukos ir jūsų organizacijos el-paštas yra privalomi norint, kad jūsų organizacija būtų matoma organizacijų sąraše";

    user: number;
    public onSaveForm: FormGroup;
    organization: Organization = new Organization();
    defaulUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    backupImageUrl: string = this.defaulUrl;
    role: number = 4;

    constructor(
        private toastCtrl: ToastController,
        private organizationService: OrganizationsService,
        private usersService: UsersService,
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private toastService: ToastService
    ) {
    }

    ngOnInit() {
        this.getRole();
        if (this.role != 3) {
            this.navCtrl.navigateRoot('not-found').catch(error => console.error(error));
        }

        this.user = this.usersService.getTokenId();
        if (this.user === null) {
            this.navCtrl.navigateRoot('main').catch(e => console.log(e));
        }
        this.onSaveForm = this.formBuilder.group({
            'imageUrl': [null, Validators.nullValidator],// gal reik det required, dar
            'title': [null, Validators.compose([
                Validators.minLength(3),
                Validators.required,
                Validators.maxLength(64)])],
            'address': [null, Validators.nullValidator],
            'phone': [null, Validators.compose([
                Validators.required,
                Validators.pattern('^[+0-9. ()-]*$')
            ])],
            'website': [null, Validators.compose([
                Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
              ])],
            'description': [null, Validators.nullValidator],
            'userId': this.usersService.getTokenId(),
            'email': [null, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
        });
        this.loadOrganization();
    }
    
    loadOrganization() {
        this.organizationService.getByUserId(this.user).subscribe(value => {
            this.organization = value;
        }, error1 => {
            this.toastService.presentToast(this.orgSettingsCannotGetOrganization, Strings.Color_Success);
        });
    }

    saveOrganization() {
        this.organizationService.update(this.organization.id, this.onSaveForm.value).subscribe(value => {
            this.toastService.presentToast(this.volSettingsAlertSuccess, Strings.Color_Success);
        }, error1 => {
            this.toastService.presentToast(this.volSettingsAlertFail, Strings.Color_Danger);
        });
    }

    onSearchChange(searchValue: string) {
        this.updateIMG(searchValue);
    }

    updateUrl() {
        this.backupImageUrl = this.defaulUrl;
    }

    updateUrl2() {
        this.backupImageUrl = this.organization.imageUrl;
    }

    updateIMG(searchValue: string) {
        this.organization.imageUrl = searchValue;
        this.backupImageUrl = searchValue;
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
