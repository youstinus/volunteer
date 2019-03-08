import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationPage } from '../registration/registration.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController) { 

  }

  ngOnInit() {
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
}
