import {Picture} from '../models/Picture';
import {Strings} from './Strings';
import {Project} from '../models/Project';
import {Organization} from '../models/Organization';
import { Volunteer } from '../models/Volunteer';

export class Objects {
    public static Empty_Organization = {
        userId: null,
        description: null,
        email: null,
        imageUrl: null,
        phone: null,
        projectsIds: [],
        id: null,
        address: null,
        picturesIds: [],
        title: null,
        website: null
    };

    public static Empty_Volunteer = {
        userId: null,
        description: null,
        email: null,
        firstName: null,
        imageUrl: null,
        lastName: null,
        phone: null,
        pictureId: null,
        projectsIds: [],
        reviewsIds: [],
        id: null
    };

    public static Empty_Project = {
        id: null,
        title: null,
        description: null,
        email: null,
        organizationId: null,
        phone: null,
        picturesIds: null,
        start: null,
        end: null,
        volunteersIds: null,
        website: null,
        imageUrl: null
      };

      public static Empty_Volunteer_Arr : Volunteer[] = [{
        userId: null,
        description: null,
        email: null,
        firstName: null,
        imageUrl: null,
        lastName: null,
        phone: null,
        pictureId: null,
        projectsIds: [],
        reviewsIds: [],
        id: null
      }];

    public static Default_Picture: Picture = {
        volunteerId: 0,
        url: Strings.Default_Image_Url,
        title: 'Default',
        projectId: 0,
        organizationId: 0,
        id: 0
    };

    public static Four_Test_Projects: Project[] = [
        {
            id: 1,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Aides',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 2,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-04-05'),
            title: 'Community',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 3,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Compliance',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 4,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Compliance',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }
    ];

    public static Four_Test_Organizations: Organization[] = [
        {
            id: 1,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Aides',
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 2,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Aides',
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 3,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Aides',
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }, {
            id: 4,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            address: '',
            userId: 0,
            phone: '866666666',
            picturesIds: [],
            title: 'Aides',
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url,
            projectsIds: []
        }
    ];

    public static Test_Projects: Project[] = [
        {
            id: 1,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Aides',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 2,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-04-05'),
            title: 'Community',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 3,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2019-05-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-02-05'),
            title: 'Compliance',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 4,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2019-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2018-03-02'),
            title: 'Volunteering',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 5,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Member',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 6,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Aid',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 7,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Aiding',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 8,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Volun',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 9,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2019-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Teering',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 10,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Education',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 11,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 12,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 13,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 14,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 15,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 16,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 17,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 18,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 19,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 20,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 21,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 22,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 23,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 24,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 25,
            description: 'sasaaaaaaaaaaaaaaaaasdasd asd asd as ffagsthsrt guigi ffybyt ffyytfy fyt bfybyjbfjytf jyt fbyjt fjy tf yjtf yj bfyj tf fjtf bfu fbjtfyjtfbyjt fb  asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yq asdj baskd jbaks jbkj njk kj jk jk qw dkwq udgnu qgud yuqw nguqw gnwu dywng uqu gunq u gyun ngy ugyq guwdg qukwu asd qwd qd wgdnuk yqg gu u gnquwgd uqwgdn yuqwg uy d',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 26,
            description: 'rvdrgvsdg',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }, {
            id: 27,
            description: 'vgrdf',
            email: 'test@gmail.com',
            end: new Date('2018-03-05'),
            organizationId: 1,
            phone: '866666666',
            picturesIds: [],
            start: new Date('2019-03-05'),
            title: 'Join us',
            volunteersIds: [],
            website: 'savanoriauk.com',
            imageUrl: Strings.Default_Image_Url
        }
    ];
}
