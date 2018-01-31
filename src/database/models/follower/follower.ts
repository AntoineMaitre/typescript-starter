import {Collection, Instance, ObjectID, Property} from 'iridium';
import {IFollowerDocument} from "./IFollowerDocument";
import {ITwitchUserDocument} from "../twitch-user/ITwitchUserDocument";

@Collection('followers')
export class Follower extends Instance<IFollowerDocument, Follower> implements IFollowerDocument {
    @ObjectID _id?: string;
    @Property(Date) created_at: Date;
    @Property(Boolean) notifications: boolean;
    @Property({
        _id: {$required: false, $type: String},
        display_name: String,
        name: String,
        type: String,
        bio: String,
        created_at: Date,
        updated_at: Date,
        logo: String
    }) twitchUser: ITwitchUserDocument;
}