import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { PasswordValidator } from '../registration/password.validator';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/utilities/Language';
import { ToastService } from 'src/app/shared/toast.service';
import { Strings } from 'src/app/constants/Strings';

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
  emailWasNotSent: string = Language.Lang.toastEmailWasNotSent;
  emailWasSent: string = Language.Lang.toastEmailWasSent;

  role: number = 4;
  public changePasswordForm: FormGroup;
  private resetParam: string;
  public forgotPass = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getRole();
    this.validateLink();
    this.initForm();
  }

  initForm() {
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
        this.toastService.presentToast(this.changePassChangedSuccess, Strings.Color_Success);
        this.navCtrl.navigateRoot('login').catch(error => console.error(error));
      }, error1 => {
        this.toastService.presentToast(this.changePassChangeFail, Strings.Color_Danger);
      });
    }
  }

  changePassword() {
    this.usersService.updateLoggedInUser(this.changePasswordForm.value).subscribe(() => {
      this.toastService.presentToast(this.changePassChangedSuccess, Strings.Color_Success);
      this.goBack();
    }, error1 => {
      this.toastService.presentToast(this.changePassChangeFail, Strings.Color_Danger);
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

  goBack() {
    this.navCtrl.back();
  }
}
