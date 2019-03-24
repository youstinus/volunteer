import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RegistrationPage } from '../registration/registration.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  private user: User; // populate values before pressing onSignUp()

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ionViewWillEnter() {
    // this.menuCtrl.enable(false);
  }


  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'username': [null, Validators.compose([
        Validators.required

        //,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }
  loadRegistrationPage(){
    //href="../registration/registration.page" routerDirection="forward"
    /*this.navCtrl.push(RegistrationPage).then(
      response => {
        console.log('Response ' + response);
      },
      error => {
        console.log('Error: ' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });;*/
    this.navCtrl.navigateForward('registration');
    //this.navCtrl.
    // turetu but push komanda is NavController pereiti i registration page?
  }
  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/registration');
  }

  onSignIn() {
    this.usersService.login(this.onLoginForm.value).subscribe(user => {
      // validate somehow
      this.user = user;
      console.log(user);
      // navigate to main page if user logged in. Should return User object with id, token and user type populated
      if (this.user != null && this.user.token != null){
        this.usersService.setUser(user);
        this.navCtrl.navigateRoot('main').catch(reason => console.log('Error while signing in'));
      }
    });
  }
}
