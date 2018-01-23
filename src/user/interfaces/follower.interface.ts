import {ITwitchUser} from "./twitch-user.interface";
import {Document} from "mongoose";

export interface IFollower extends Document {
    readonly created_at: Date;
    readonly notifications: boolean;
    readonly user: ITwitchUser;
}