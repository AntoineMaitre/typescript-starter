/**
 * Created by tdoret on 15/01/2018.
 */
import {Document} from 'mongoose';

export interface User extends Document {
    readonly _id: number;
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
    readonly followers: Follower[];
    readonly subscribers: string[];
}

export interface Role extends Document {
    readonly name: string;
    readonly description: string;
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}

export interface Follower extends Document {
    created_at: Date;
    notifications: boolean;
    user: UserTwitch;
}

export interface UserTwitch extends User {
    display_name: string;
    _id: number;
}