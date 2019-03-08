import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectsService} from '../../services/projects.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  // private projects: Project[];
  private projects: Project[] = [
    {
      id: 1,
      title: 'VšĮ Pagirk',
      description: 'Kviečiami savanoriai įvairiems pagalbiniams darbams atlikti:•gyvūnų priežiūrai•aplinkos tvarkymui Lietuvos zoologijos sode;•pagalbai ruošiantis renginiams (dekoracijų gaminimas, idėjų generavimas, veiklų koordinavimas ir vykdymas renginio dieną, gyvūnų pristatymas',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    },
    {
      id: 2,
      title: 'KAUNO TAUTINĖS KULTŪROS CENTRAS',
      description: 'Mes, BasosRasos - bendruomenės boutique, vystome veiklą ir ieškome savanorių dirbti bendruomenės parduotuvėje bei dalyvauti mūsų bendruomenės socialinėse iniciatyvose.#BasosRasos siūlo puikią',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    },
    {
      id: 3,
      title: 'Kauno miesto muziejus',
      description: 'Pavasario vėjams siaučiant, Kauno miesto muziejus kelia trispalvę ir kovo 11 d., 12-17 val., laukia svečių. Tikimės šventinio svečių potvynio, tad labai džiaugsimės, jei padėsite juos priimti',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    },
    {
      id: 4,
      title: 'VŠĮ Ištiesk pagalbos ranką 2',
      description: 'Ieškome savanorių nepilnai darbo dienai, norinčių dirbti su raidos sutrikimų turinčiais vaikais! Jei Tu imlus, darbštus, geras ir mylintis vaikus žmogus – prisijunk prie mūsų komandos. Analizuoti ir gilintis į vaiko poreikius, socialinio elgesio sunkumus ir stiprybes',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    },
    {
      id: 5,
      title: 'VŠĮ Ištiesk pagalbos ranką 3',
      description: 'Pavasario vėjams siaučiant, Kauno miesto muziejus kelia trispalvę ir kovo 11 d., 12-17 val., laukia svečių. Tikimės šventinio svečių potvynio, tad labai džiaugsimės, jei padėsite juos priimti',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    },
    {
      id: 6,
      title: 'Kauno miesto muziejus',
      description: 'elgesio sunkumus ir stiprybes, kartu su kitais komandos nariais ir vaiko tėvais sudaryti vaiko socialinių įgūdžių lavinimo planą, dirbti su vaikais individualiai ir grupėje, stiprinti vaiko socialinius įgūdžius, ugdyti jo savitvarką ir savarankiškumą',
      email: 'email@test.com',
      organizationId: 5,
      phone: '866666666',
      picturesIds: [1],
      start: new Date('2019-05-01'),
      volunteersIds: [1],
      websiteUrl: 'https://volunteering.com'
    }
  ];

  constructor(private projectsService: ProjectsService, private navCtrl: NavController) {
  }

  ngOnInit() {
    // this.projectsService.getAll().subscribe(items => {
    //   this.projects = items;
    //   console.log(this.projects, this.projects2);
    // });
  }

  onProjectClicked(project: Project) {
    this.navCtrl.navigateForward('projects/' + project.id);
  }
}
