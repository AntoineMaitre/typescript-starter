/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';

export const FollowerSchema = new mongoose.Schema({
    created_at: {type: Date, required: false},
    notifications: {type: Boolean, required: false},
    user: {
        display_name: {type: String, required: false},
        _id: {type: String, required: false},
        name: {type: String, required: false},
        type: {type: String, required: false},
        bio: {type: String, required: false},
        created_at: {type: Date, required: false},
        updated_at: {type: Date, required: false},
        logo: {type: String, required: false},
    },
});

export const UserSchema = new mongoose.Schema({
    twitch_id: {type: String, required: false},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    username: {type: String, required: false},
    avatar: {type: String, required: false},
    birthDate: {type: Date, required: false},
    email: {type: String, required: true},
    password: {type: String, required: false},
    // address: {type: [{type: Schema.ObjectId, ref: 'Address'}], required: false},
    phoneNumber: {type: String, required: false},
    // roles: {type: [{type: Schema.ObjectId, ref: 'Role'}], required: false},
    active: {type: Boolean, required: true, default: true},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
    // verified: {type: Boolean, required: true, default: false},
    loginAttempts: {type: Number, required: true, default: 0},
    app_token: {type: String, required: false},
    twitch_auth_token: {type: String, required: false},
    twitch_auth_refresh_token: {type: String, required: false},
    followers: {type: [{type: FollowerSchema, required: false}]},
    subscribers: {type : [{type: String, required: false}]},
});
