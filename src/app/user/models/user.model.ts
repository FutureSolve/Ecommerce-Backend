import { UserTypeEnum } from '../enums/user-type.enum';

export class UserModel {
    id?: number;
    name: string;
    email: string;
    password: string;
    type: UserTypeEnum;
    phone: string;
    city: string;
    address: string;

    constructor(partial: Partial<UserModel>) {
        Object.assign(this, partial);
    }
}
export class UserModelForGoogle {
    id?: number;
    name: string;
    email: string;
    type: string;
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;

    constructor(partial: Partial<UserModel>) {
        Object.assign(this, partial);
    }
}
