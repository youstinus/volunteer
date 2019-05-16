import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { RegistrationPage } from '../registration/registration.page';
import { PasswordValidator } from '../registration/password.validator';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/utilities/Language';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePassHeader: string = Language.Lang.changePassHeader;
  changePassFieldSet: string = Language.Lang.changePassFieldSet;
  changePassEnterUserEmail: string = Language.Lang.changePassEnterUserEmail;
  changePassOldPassword: string = Language.Lang.changePassOldPassword;
  changePassNewPassword: string = Language.Lang.changePassNewPassword;
  changePassConfirmPassword: string = Language.Lang.changePassConfirmPassword;
  changePassButton: string = Language.Lang.changePassButton;
  changePassGoBack: string = Language.Lang.changePassGoBack;
  changePassChangedSuccess: string = Language.Lang.changePassChangedSuccess;
  changePassChangeFail: string = Language.Lang.changePassChangeFail;
  changePassFielRequired: string = Language.Lang.changePassFielRequired;
  changePassContain5: string = Language.Lang.changePassContain5;
  changePassPassDontMatch: string = Language.Lang.changePassPassDontMatch;

  role: number = 4;
  user: User = new User();
  public changePasswordForm: FormGroup;
  public matching_passwords_group: FormGroup;
  private email: string;
  private resetParam: string;
  private forgotPass = false;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRole();
    this.validateLink();
    this.changePasswordForm = new FormGroup({
      password1: new FormControl(),
      password: new FormControl(),
      oldPassword: new FormControl()
    });
    if (this.role == 4) {
      this.changePasswordForm = this.formBuilder.group({
        'email': [null, Validators.nullValidator],
        'password1': [null, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])],
        'password': [null, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])]
      }, {
          validator: PasswordValidator.MatchPassword
        });
    } else {
      this.changePasswordForm = this.formBuilder.group({
        'oldPassword': [null, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])],
        'password1': [null, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])],
        'password': [null, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])]
      }, {
          validator: PasswordValidator.MatchPassword
        });
    }
  }

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
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

  resetPassword() {
    console.log('Changed password:');
    console.log(this.changePasswordForm.value);
    if(this.role!=4){
      this.email=this.changePasswordForm.value.email;
    }
    var pass = this.changePasswordForm.value;
    if (pass.password == pass.password1) {
      this.usersService.updateByEmail(this.resetParam, pass).subscribe(() => { // resetParam instead of email
        console.log('Password changed');
        this.presentSToast();
        this.navCtrl.navigateRoot('login').catch(error => console.error(error));
      }, error1 => {
        this.presentFToast();
        console.log('password not changed', error1);
      });
    }
  }

  changePassword() {
    this.usersService.updateLoggedInUser(this.changePasswordForm.value).subscribe(() => {
      console.log('Password changed');
      this.presentSToast();
      this.navCtrl.back();
    }, error1 => {
      this.presentFToast();
      console.log('password not changed', error1);
    });
  }

  goBack() {
    console.log('Navigate back to settings');
    this.navCtrl.back;
  }
// http://localhost:8100/change-password/ZjhUTUhUdWw2aS9nUmhjemtzYVMvVVJqa25CdUcxZlk
  validateLink() {
    this.resetParam = this.route.snapshot.params['reset'];
    console.log(this.usersService.getTokenId())
    if (this.resetParam != null && this.resetParam != '') {
      this.forgotPass = true;
      console.log(this.resetParam);
      let mail = this.usersService.decodeResetMail(this.resetParam);
      console.log(mail);
      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let success = regexp.test(mail);
      if (!success) {
        this.navCtrl.back;
        this.navCtrl.navigateRoot('main').catch(error => console.error(error));
      } else {
        this.email = mail;
      }
    } else {
      this.forgotPass = false;
        if(this.role<=0 || this.role>3)
        {
          this.navCtrl.navigateRoot('main').catch(error => console.error(error));
        }
    }
  }
  async presentSToast() {
    const toast = await this.toastCtrl.create({
      message: this.changePassChangedSuccess,
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

  async presentFToast() {
    const toast = await this.toastCtrl.create({
      message: this.changePassChangeFail,
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
}
