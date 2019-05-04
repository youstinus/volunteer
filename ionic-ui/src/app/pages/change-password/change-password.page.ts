import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { RegistrationPage } from '../registration/registration.page';
import { PasswordValidator } from '../registration/password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  role: number = 4;
  user: User = new User();
  public changePasswordForm: FormGroup;
  public matching_passwords_group: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getRole();
    this.changePasswordForm = new FormGroup({
      password1: new FormControl(),
      password: new FormControl()
    });
    if (this.role == 4) {
      this.changePasswordForm = this.formBuilder.group({
        'oldPassword': [null, Validators.nullValidator],
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

  changePassword() {
    console.log('Changed password:');
    console.log(this.changePasswordForm.value);
  }

}
