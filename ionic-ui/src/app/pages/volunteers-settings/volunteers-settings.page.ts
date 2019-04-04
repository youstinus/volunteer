import {Component, OnInit} from '@angular/core';
import {Volunteer} from '../../models/Volunteer';
import {VolunteersService} from '../../services/volunteers.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {UsersService} from '../../services/users.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-volunteers-settings',
    templateUrl: './volunteers-settings.page.html',
    styleUrls: ['./volunteers-settings.page.scss'],
})
export class VolunteersSettingsPage implements OnInit {

    user: User;
    volunteer: Volunteer = {
        id: 2,
        firstName: 'Jason',
        lastName: 'Statham',
        phone: '1800-STATHAM',
        email: 'baldman89@one.lt',
        description: 'Anglų aktorius, geriausiai žinomas vaidmenimis Guy Ritchie kriminaliniuose filmuose „Lok, stok arba šauk“, „Revolveris“ ir „Vagišiai“',
        pictureId: 21,
        userId: 11,
        projectsIds: [1],
        imageUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUzMzQzOTkxMDAwMDgxNzA2/jason-statham-attends-the-press-conference-of-director-f-gary-grays-film-the-fate-of-the-furious-on-march-23-2017-in-beijing-china-photo-by-vcg_vcg-via-getty-images-square.jpg',
        reviewsIds: [2],
    };

    constructor(
        private volunteersService: VolunteersService,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private navCtrl: NavController) {
    }

    ngOnInit() {
        this.user = this.usersService.getUser();
        if (this.user === null) {
            this.navCtrl.navigateRoot('main').catch(e => console.log(e));
        }

        this.loadVolunteer();
    }

    loadVolunteer() {
        this.volunteersService.getByUsersId(this.user.id).subscribe(value => {
            this.volunteer = value;
        }, error1 => {
            console.log('Cannot get volunteer from database', error1);
        });
    }

    saveVolunteer() {
        this.volunteersService.update(this.user.volunteerId, this.volunteer).subscribe(value => {
            console.log('Volunteer was updated successfully');
            console.log(value);

        }, error1 => {
            console.log('Volunteer was not updated', error1);
        });
    }
}
