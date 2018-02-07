/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';
import {FollowerSchema} from "./follower.schema";

export const UserSchema = new mongoose.Schema({
    twitch_id: {type: String, required: false},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    username: {type: String, required: false},
    avatar: {type: String, required: false},
    birthDate: {type: Date, required: false, default: new Date()},
    email: {type: String, required: true},
    password: {type: String, required: false},
    // address: {type: [{type: Schema.ObjectId, ref: 'Address'}], required: false},
    phoneNumber: {type: String, required: false},
    roles: {type: [{type: Number, required: false}]},
    active: {type: Boolean, required: true, default: true},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
    // verified: {type: Boolean, required: true, default: false},
    loginAttempts: {type: Number, required: true, default: 0},
    app_token: {type: String, required: false},
    twitch_auth_token: {type: String, required: false},
    twitch_auth_refresh_token: {type: String, required: false},
    followers: {type: [{type: FollowerSchema, required: false}]},
    subscribers: {type: [{type: String, required: false}]}
});