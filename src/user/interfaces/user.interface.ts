/**
 * Created by tdoret on 15/01/2018.
 */
import {Document} from 'mongoose';
import {IFollower} from "./follower.interface";

export interface IUser extends Document {
    readonly twitch_id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly username: string;
    readonly avatar: string;
    readonly birthDate: Date;
    readonly email: string;
    readonly password: string;
    // address:  [ Schema.ObjectId; ref: 'Address'}];
    readonly phoneNumber: string;
    readonly roles: Role[];
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
    // verified:  Boolean; required: true; default: false};
    readonly loginAttempts: number;
    readonly app_token: string;
    readonly twitch_auth_token: string;
    readonly twitch_auth_refresh_token: string;
    readonly followers: IFollower[];
    readonly subscribers: string[];
}

export enum Role {
    VIEWER = 0,
    STREAMER = 1,
}
