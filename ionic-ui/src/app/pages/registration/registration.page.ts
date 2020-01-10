import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { NavController, LoadingController } from '@ionic/angular';
import { PasswordValidator } from './password.validator';
import { Language } from 'src/app/utilities/Language';
import { Strings } from 'src/app/constants/Strings';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) { }

  register: string = Language.Lang.menuRegistration;
  registrationTitle: string = Language.Lang.registrationTitle;
  registrationInformation: string = Language.Lang.registrationInformation;
  registrationUsername: string = Language.Lang.registrationUsername;
  registrationEmail: string = Language.Lang.registrationEmail;
  registrationType: string = Language.Lang.registrationType;
  registrationVolunteer: string = Language.Lang.registrationVolunteer;
  registrationOrganization: string = Language.Lang.registrationOrganization;
  registrationPassword: string = Language.Lang.registrationPassword;
  registrationConfirm: string = Language.Lang.registrationConfirm;
  registrationTerms: string = Language.Lang.registrationTerms;
  registrationSingUp: string = Language.Lang.registrationSingUp;
  registrationRequiredMessage: string = Language.Lang.registrationRequiredMessage;
  registrationPasswordMisMatch: string = Language.Lang.registrationPasswordMisMatch;
  registrationHaveAnAccount: string = Language.Lang.registrationHaveAnAccount;
  registrationValidEmail: string = Language.Lang.registrationValidEmail;
  registrationSuccess: string = Language.Lang.registrationSuccess;
  registrationFailed: string = Language.Lang.registrationNotRegisteredMessage;
  registrationUsernameTaken: string = Language.Lang.registrationUsernameTaken;
  registrationEmailTaken: string = Language.Lang.registrationEmailTaken;
  toastClose: string = Language.Lang.toastClose;

  public user: User = new User();
  public roleSelector = '2';
  public onRegisterForm: FormGroup;
  public matching_passwords_group: FormGroup;

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    const rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'username': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password1': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      'type': [null, Validators.compose([
        Validators.required
      ])],
      'terms': [false, Validators.compose([
        RegistrationPage.mustBeTruthy
      ])]
    }, {
        validator: PasswordValidator.MatchPassword
      });
  }

  async signUp() {

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.usersService.register(this.onRegisterForm.value).subscribe(user => {
        this.user = user;
        if (this.user != null) {
          this.toastService.presentToastClose(this.registrationSuccess, Strings.Color_Success, this.toastClose);
          this.navCtrl.navigateForward('login').catch(reason => console.log('Failed to move to login page'));
        } else {
          this.toastService.presentToastClose(this.registrationFailed, Strings.Color_Danger, this.toastClose);
        }
      }, error1 => {
        const reason = this.getReason(error1.error);
        this.toastService.presentToastClose(this.registrationFailed + '. ' + reason, Strings.Color_Danger, this.toastClose);
      });
    });
  }

  getReason(error: string) {
    if (error.includes('Username')) {
      return this.registrationUsernameTaken;
    }
    if (error.includes('Email')) {
      return this.registrationEmailTaken;
    }
  }

  conditions() {
    window.open('privacy', '_system');
  }

  goToLogin() {
    this.navCtrl.navigateForward('login').catch(reason => console.log(reason));
  }
}
