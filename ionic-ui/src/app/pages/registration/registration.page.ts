import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { NavController, MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { PasswordValidator } from './password.validator';
import { Language } from 'src/app/utilities/Language';
import { Lang } from 'src/app/models/Lang';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  lang = new Lang();
  register: string= Language.Lang.menuRegistration;
  registrationTitle: string=Language.Lang.registrationTitle;
  registrationInformation: string=Language.Lang.registrationInformation;
  registrationUsername: string=Language.Lang.registrationUsername;
  registrationEmail: string=Language.Lang.registrationEmail;
  registrationType: string=Language.Lang.registrationType;
  registrationVolunteer: string=Language.Lang.registrationVolunteer;
  registrationOrganization: string=Language.Lang.registrationOrganization;
  registrationPassword: string=Language.Lang.registrationPassword;
  registrationConfirm: string=Language.Lang.registrationConfirm;
  registrationTerms: string=Language.Lang.registrationTerms;
  registrationSingUp: string=Language.Lang.registrationSingUp;
  registrationRequiredMessage: string=Language.Lang.registrationRequiredMessage;
  registrationPasswordMisMatch: string=Language.Lang.registrationPasswordMisMatch;
  registrationHaveAnAccount: string=Language.Lang.registrationHaveAnAccount;
  registrationValidEmail: string=Language.Lang.registrationValidEmail;

  user: User = new User();
  public roleSelector = '2';
  public onRegisterForm: FormGroup;
  public matching_passwords_group: FormGroup;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public alertController: AlertController
  ) { }

  ngOnInit() {

    //https://forum.ionicframework.com/t/password-and-confirm-password-validation/67764/13
    // https://github.com/yuyang041060120/ng2-validation#notequalto-1
    //https://www.elite-corner.com/2018/09/match-password-validation-in-angular.html
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

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
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
          this.presentSToast();
          this.navCtrl.navigateForward('login').catch(reason => console.log('Failed to move to login page'));
        } else {
          this.presentNotRegistered();
        }
      }, error1 => {
        this.presentNotRegistered();
        console.log(error1);
      });
    });
  }

  conditions() {
    window.open('privacy', '_system')
  }

  goToLogin() {
    this.navCtrl.navigateForward('login').catch(reason => console.log(reason));
  }

  async presentSToast() {
    const toast = await this.toastCtrl.create({
      message: Language.Lang.registrationSuccess,
      duration: 2500,
      position: 'bottom',
      color: 'success',
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

  async presentNotRegistered() {
    const alert = await this.alertController.create({
      header:  Language.Lang.registrationNotRegisteredHeader,
      message: Language.Lang.registrationNotRegisteredMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
}
