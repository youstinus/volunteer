import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
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
  public changePasswordForm: FormGroup;
  private resetParam: string;
  public forgotPass = false;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRole();
    this.validateLink();

    let oldPassValidator: ValidatorFn;

    if (this.role == 4) {
      oldPassValidator = Validators.nullValidator;
    } else {
      oldPassValidator = Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]);
    }

    this.changePasswordForm = this.formBuilder.group({
      'oldPassword': [null, oldPassValidator],
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

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  getRole() {
    const role = this.usersService.getTokenRole();
    switch (role) {
      case 'Admin':
        this.role = 0;
        break;
      case 'Moderator':
        this.role = 1;
        break;
      case 'Volunteer':
        this.role = 2;
        break;
      case 'Organization':
        this.role = 3;
        break;
      default:
        this.role = 4;
        break;
    }
  }

  resetPassword() {
    var passwords = this.changePasswordForm.value;
    if (passwords.password == passwords.password1) {
      this.usersService.updateByEmail(this.resetParam, passwords).subscribe(() => {
        this.presentSToast();
        this.navCtrl.navigateRoot('login').catch(error => console.error(error));
      }, error1 => {
        this.presentFToast();
      });
    }
  }

  changePassword() {
    this.usersService.updateLoggedInUser(this.changePasswordForm.value).subscribe(() => {
      this.presentSToast();
      this.goBack();
    }, error1 => {
      this.presentFToast();
    });
  }

  validateLink() {
    this.resetParam = this.route.snapshot.params['reset'];
    if (this.resetParam != null && this.resetParam != '') {
      this.forgotPass = true;
    } else {
      if (this.role == 4) {
        this.navCtrl.navigateRoot('main').catch(error => console.error(error));
      }
      this.forgotPass = false;
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
          }
        }
      ]
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
