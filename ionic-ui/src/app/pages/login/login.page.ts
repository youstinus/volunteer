import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { UserType } from '../../enums/UserType';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { async } from 'q';
import { Language } from 'src/app/utilities/Language';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  menuLogin: string=Language.Lang.menuLogin;
  loginWelcome: string=Language.Lang.loginWelcome;
  loginFieldset: string=Language.Lang.loginFieldset;
  loginUsername: string=Language.Lang.loginUsername;
  loginPassword: string=Language.Lang.loginPassword;
  loginForgot: string=Language.Lang.loginForgot;
  loginButton: string=Language.Lang.loginButton;
  loginNewHere: string=Language.Lang.loginNewHere;
  loginSignUp: string=Language.Lang.loginSignUp;
  loginResetPasswordMessage: string=Language.Lang.loginResetPasswordMessage;
  loginRequiredField: string=Language.Lang.loginRequiredField;
  loginSuccessfulEmail: string=Language.Lang.loginSuccessfulEmail;
  loginUnSuccessfulEmail: string=Language.Lang.loginUnSuccessfulEmail;
  loginWrongHeader: string=Language.Lang.loginWrongHeader;
  loginWrongMessage: string=Language.Lang.loginWrongMessage;

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
      header: this.loginWrongHeader,
      message: this.loginWrongMessage,
      buttons: ['OK']
    });
    await alert.present();
  }

  async forgotPass() {
    if (this.can) {
      this.can = false;
      const alert = await this.alertCtrl.create({
        header: this.loginForgot,
        message: this.loginResetPasswordMessage,
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: Language.Lang.alertCancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
              this.can = true;
            }
          }, {
            text: Language.Lang.alertConfirm,
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
      message: this.loginSuccessfulEmail,
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
      message: this.loginUnSuccessfulEmail,
      duration: 2500,
      position: 'bottom',
      color: 'warning',
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

  sendEmail(email: string) {

    let url = `https://us-central1-volunteer-ui.cloudfunctions.net/sendMail`
    let linkParam = this.usersService.encodeResetMail(email);
    let content = this.makeContent(linkParam);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let params: object = {
      to: email,
      subject: 'volunteering.platypus@gmail.com',
      content: content
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

  makeContent(linkParam: string) {

    let template = `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Volunteering Platypus</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; 
              }
        
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }
        
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }
        
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
        
              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }
        
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }
        
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }
        
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }
        
              .wrapper {
                box-sizing: border-box;
                padding: 20px; 
              }
        
              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }
        
              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }
        
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }
        
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; 
              }
        
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }
        
              a {
                color: #3498db;
                text-decoration: underline; 
              }
        
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }
        
              .btn-primary table td {
                background-color: #3498db; 
              }
        
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; 
              }
        
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }
        
              .first {
                margin-top: 0; 
              }
        
              .align-center {
                text-align: center; 
              }
        
              .align-right {
                text-align: right; 
              }
        
              .align-left {
                text-align: left; 
              }
        
              .clear {
                clear: both; 
              }
        
              .mt0 {
                margin-top: 0; 
              }
        
              .mb0 {
                margin-bottom: 0; 
              }
        
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }
        
              .powered-by a {
                text-decoration: none; 
              }
        
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }
        
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; 
                }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; 
                }
                table[class=body] .content {
                  padding: 0 !important; 
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table[class=body] .btn table {
                  width: 100% !important; 
                }
                table[class=body] .btn a {
                  width: 100% !important; 
                }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }
        
              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }
        
            </style>
          </head>
          <body class="">
            <span class="preheader">Volunteering Platypus</span>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p>Hey there,</p>
                                <p>We are sending You the link where you can set Your new password.</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td> <a href="http://volunteering.ga/change-password/${linkParam}" target="_blank">Set new password</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>Good luck! Hope it works. If it is not working, please contact us at info@volunteering.ga</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Volunteering System, Studentų g. 50, Kaunas</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Made by <a href="http://volunteering.ga">Platypus</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
        `;
    return template;
  }
}
