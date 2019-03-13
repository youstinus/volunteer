import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {RouterOutlet} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user: User = new User();

  constructor(private usersService: UsersService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
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
  }
}
