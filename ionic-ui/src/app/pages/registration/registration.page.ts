import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {RouterOutlet, Router} from '@angular/router';
import {NavController, MenuController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user: User = new User();

  public onRegisterForm: FormGroup;


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
    ) { }

    ionViewWillEnter() {
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  } 

  validation_messages = { 
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

/*  onSubmit(values){
    console.log(values);
    this.router.navigate(["/user"]);}
*/
  /*onRegister(form: NgForm) {
    console.log('submited');
    //form. kuri forma ir kaip naudoti ja duomenims apdoroti
    console.log(form.form);
    console.log(this.user);
    
    // email validation
    // password match
    // password validation
    // default selection volunteer
    // checkbox for terms and conditions

    this.usersService.register(this.user).subscribe(user => {
      this.user = user;
      console.log(user);
      this.navCtrl.navigateForward('login');
    });
    }*/

}
