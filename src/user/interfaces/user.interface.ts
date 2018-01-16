/**
 * Created by tdoret on 15/01/2018.
 */
import { Document } from 'mongoose';

export interface User extends Document {
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

export enum Role {
    VIEWER = 0,
    STREAMER,
}

export interface UserTwitch extends Document {
    readonly display_name: string;
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly bio: string;
    readonly created_at: Date;
    readonly updated_at: Date;
    readonly logo: string;
}

export interface Follower extends Document {
    readonly created_at: Date;
    readonly notifications: boolean;
    readonly user: UserTwitch;
}
