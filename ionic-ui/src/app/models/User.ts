import {UserType} from '../enums/UserType';

export class User {
    public id: number;
    public username: string;
    public email: string;
    public type: UserType;
    public password: string;
    public token: string;
    public volunteerId: number;
    public organizationId: number;
}
