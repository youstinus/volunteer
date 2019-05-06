import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public commentForm: FormGroup;
  sources: string[];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.sources =
      [
        'https://www.gvi.co.uk/blog/17-excellent-reasons-to-volunteer/',
        'https://buildabroad.org/2017/10/13/why-is-volunteering-important/',
        'https://www.thebalancesmb.com/unexpected-benefits-of-volunteering-4132453'
      ];

    this.commentForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'text': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  leaveComment() {
    this.sendEmail();
  }

  async commentResult() {
    const alert = await this.alertCtrl.create({
      header: 'Thank you',
      message: 'Your email has been submited',
      buttons: [
        {
          text: 'Continue',
          role: 'Continue',
          cssClass: 'secondary',
          handler: () => {
            // noreciau kad duomenys issitrintu?
            console.log('Confirm continue');

            this.commentForm.setValue({
              'email': [null],
              'text': [null]
            });

          }
        }
      ]
    });
    await alert.present();
  }

  async onSourceClicked(source: string) {
    const alert = await this.alertCtrl.create({
      header: '   Wisit?',
      message: 'Click confirm if you want to navigate to this page in a new tab',
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
              handler: () => {
                  console.log('Confirmed');
                  window.open(source, '_system')
                }
              }
      ]
  });

  await alert.present();
  }

  sendEmail() {

    let url = `https://us-central1-volunteer-ui.cloudfunctions.net/sendMail`

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let params: object = {
      to: 'volunteering.platypus@gmail.com',
      subject: this.commentForm.value.email,
      content: this.commentForm.value.text
    };

    return this.http.post(url, params, { headers: headers })
      .toPromise()
      .then(res => {
        this.commentResult();
      })
      .catch(err => {
        console.log(err) // error popup
      })

  }
}
