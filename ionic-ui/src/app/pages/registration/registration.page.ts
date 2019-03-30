import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, NgForm, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {RouterOutlet, Router} from '@angular/router';
import {NavController, MenuController, LoadingController} from '@ionic/angular';
import { PasswordValidator } from './password.validator';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user: User = new User();

  public onRegisterForm: FormGroup;
  public matching_passwords_group: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
    ) { }

    ionViewWillEnter() {
      // this.menuCtrl.enable(false);
    }

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
      'terms': [null, Validators.compose([
        Validators.required
      ])]
    },{
      validator: PasswordValidator.MatchPassword
    });
  }


  async signUp() {

    console.log(this.onRegisterForm);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      // this.navCtrl.navigateRoot('registration'); // navigate login, kol kas palikau ten pat
      // iki čia ateina user == null
      this.usersService.register(this.onRegisterForm.value).subscribe(user => {
        this.user = user;
        console.log(user);
        if (this.user != null) {
          this.navCtrl.navigateForward('login').catch(reason => console.log('Failed to move to login page'));
        } else {
          console.log('Registration failed');
        }
      }, error1 => {
        console.log('User was not registered', error1);
      });
    });
  } 
  conditions(){
    this.navCtrl.navigateRoot('home');
  }

  goToLogin() {
    this.navCtrl.navigateForward('login');
  }

  /*onSubmit(values){
    console.log(values);
   // this.router.navigate(["/user"]);
  }*/

  // metodas neiskvieciamas nuo HTML. Pritaikyti tik vieną signUp arba onRegister
  onRegister(form: NgForm) {
    console.log('submited');
    //form. kuri forma ir kaip naudoti ja duomenims apdoroti
    console.log(form.form);
    console.log(this.user);
    
    // password match
    // password validation

    this.usersService.register(this.user).subscribe(user => {
      this.user = user;
      console.log(user);
      if (this.user != null) {
        this.navCtrl.navigateForward('login').catch(reason => console.log('Failed to move to login page'));
      } else {
        console.log('Registration failed');
      }
    });
    }

}
