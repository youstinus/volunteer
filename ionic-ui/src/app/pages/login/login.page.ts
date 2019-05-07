import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { UserType } from '../../enums/UserType';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { async } from 'q';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public onLoginForm: FormGroup;
    private user: User;
    private message: String;
    can: boolean = true;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        public alertController: AlertController,
        private http: HttpClient
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
        if (this.can) {
            this.can = false;
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
                            this.can = true;
                        }
                    }, {
                        text: 'Confirm',
                        handler: (data) => {
                            console.log(data.email);
                            this.sendEmail(data.email);
                        }
                    }
                ]
            });
            await alert.present();
        }
    }
    async presentSToast() {
        const toast = await this.toastCtrl.create({
            message: 'Email has been sent.',
            duration: 2000,
            position: 'bottom',
            color:'success',
            translucent: true,
            buttons: [
                {
                    text: 'Close',
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
            message: 'Email has not sent.',
            duration: 2000,
            position: 'bottom',
            color:'warning',
            translucent: true,
            buttons: [
                {
                    text: 'Close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    sendEmail(email: String) {

        let url = `https://us-central1-volunteer-ui.cloudfunctions.net/sendMail`
        this.message = "Paspauskite sita nuoroda noredami atkurti slaptazodi";

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let params: object = {
            to: email,
            subject: 'volunteering.platypus@gmail.com',
            content: this.message
        };

        return this.http.post(url, params, { headers: headers })
            .toPromise()
            .then(res => {
                this.forgotPass();
                this.presentSToast();
                this.can = true;
            })
            .catch(err => {
                console.log(err) // error popup
                this.presentFToast();
                this.can = true;
            })

    }

    goToRegister() {
        this.navCtrl.navigateRoot('/registration');
    }
}
