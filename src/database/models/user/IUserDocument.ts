import {IFollowerDocument} from "../follower/IFollowerDocument";

export interface IUserDocument {
    _id?: string;
    name: string;
    twitch_id?: string;
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
    birthDate: Date;
    email: string;
    password: string;
    // address:  [ Schema.ObjectId; ref: 'Address'}];
    phoneNumber: string;
    roles: Role[];
    active: boolean;
    created_at: Date;
    updated_at: Date;
    // verified:  Boolean; required: true; default: false};
    loginAttempts: number;
    app_token: string;
    twitch_auth_token: string;
    twitch_auth_refresh_token: string;
    followers: IFollowerDocument[];
    subscribers: string[];
}

export enum Role {
    VIEWER = 0,
    STREAMER = 1,
}