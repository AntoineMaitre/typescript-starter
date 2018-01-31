import {ITwitchUserDocument} from "../twitch-user/ITwitchUserDocument";

export interface IFollowerDocument {
    _id?: string;
    created_at: Date;
    notifications: boolean;
    twitchUser: ITwitchUserDocument;
}