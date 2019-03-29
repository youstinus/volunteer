import { Component, OnInit } from '@angular/core';
import {Volunteer} from "../../models/Volunteer";
import {VolunteersService} from "../../services/volunteers.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-volunteers-settings',
  templateUrl: './volunteers-settings.page.html',
  styleUrls: ['./volunteers-settings.page.scss'],
})
export class VolunteersSettingsPage implements OnInit {

  volunteer: Volunteer = {
    id: 2,
    firstName: 'Jason',
    lastName: 'Statham',
    phone : '1800-STATHAM',
    email: 'baldman89@one.lt',
    description: 'Anglų aktorius, geriausiai žinomas vaidmenimis Guy Ritchie kriminaliniuose filmuose „Lok, stok arba šauk“, „Revolveris“ ir „Vagišiai“',
    pictureId: 21,
    userId: 11,
    projectsIds: [1],
    reviewsIds: [2],

  };

  constructor(private organizationsService: VolunteersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.organizationsService.getById(id).subscribe(value => {
      this.volunteer = value;
    }, error1 => {
      console.log(error1);
    });
  }
}
