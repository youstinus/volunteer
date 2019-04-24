import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { UserType } from '../../enums/UserType';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public onLoginForm: FormGroup;
    private user: User;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        public alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.onLoginForm = this.formBuilder.group({
            'username': [null, Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])],
            'password': [null, Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])]
        });
    }

    onSignIn() {
        this.usersService.login(this.onLoginForm.value).subscribe(user => {
            // validate somehow
            this.user = user;

            // navigate to main page if user logged in. Should return User object with id, token and user type populated
            if (this.user != null && this.user.token != null) {
                this.usersService.setUser(user);
                this.navCtrl.navigateRoot('main').catch(reason => console.log('Error while signing in'));
            } else {
                this.presentNotLoggedIn();
                console.log('User was not validated');
            }
        }, error1 => {
            this.presentNotLoggedIn();
            console.log('Bad credentials', error1)
        });
    }

    async presentNotLoggedIn() {
        const alert = await this.alertController.create({
          header: 'Something went wron',
          message: 'Please, check your information ant try again or sing up if you are new here!',
          buttons: ['OK']
        });
        await alert.present();
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
                                message: 'Email was sent successfully.',
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

    goToRegister() {
        this.navCtrl.navigateRoot('/registration');
    }
}
