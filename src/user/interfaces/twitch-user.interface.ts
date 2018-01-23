import {Document} from "mongoose";

export interface ITwitchUser extends Document {
    readonly display_name: string;
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly bio: string;
    readonly created_at: Date;
    readonly updated_at: Date;
    readonly logo: string;
}