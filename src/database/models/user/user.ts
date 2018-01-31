import {Collection, Index, Instance, ObjectID, Property} from "iridium";
import {IUserDocument, Role} from "./IUserDocument";
import {IFollowerDocument} from "../follower/IFollowerDocument";
import * as _ from "lodash";

let moment = require('moment');
let settings: any = {};

@Collection('users')
@Index({name: 1})
@Index({email: 1}, {unique: true})
export class User extends Instance<IUserDocument, User> implements IUserDocument {
    @Property(String) twitch_id?: string;
    @Property(String) firstname: string;
    @Property(String) lastname: string;
    @Property(String) username: string;
    @Property(String) avatar: string;
    @Property(Date) birthDate: Date;
    @Property(String) email: string;
    @Property(String) password: string;
    @Property(String) phoneNumber: string;
    @Property([Role]) roles: Role[];
    @Property(Boolean) active: boolean;
    @Property(Date) created_at: Date;
    @Property(Date) updated_at: Date;
    @Property(Number) loginAttempts: number;
    @Property(String) app_token: string;
    @Property(String) twitch_auth_token: string;
    @Property(String) twitch_auth_refresh_token: string;
    @Property([{
        _id: String,
        created_at: Date,
        notifications: Boolean,
        twitchUser: {
            _id: {$required: false, $type: String},
            display_name: String,
            name: String,
            type: String,
            bio: String,
            created_at: Date,
            updated_at: Date,
            logo: String
        }
    }])
    followers: IFollowerDocument[];

    @Property([String]) subscribers: string[];
    @ObjectID _id?: string;
    @Property(/^.+$/) name: string;

    static onCreating(user: IUserDocument) {
        const passwordTest = /(?=^.{8,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;

        if (!passwordTest.test(user.password || "")) return Promise.reject(new Error("Password didn\"t meet the minimum safe password requirements. Passwords should be at least 8 characters long, and contain at least 3 of the following categories: lowercase letters, uppercase letters, numbers, characters"));

        user.password = require("crypto").createHash("sha512").update(settings.security.salt).update(user.password).digest("hex");
        user.updated_at = moment();

        if (!user.created_at) {
            user.created_at = moment();
        }

        _.defaultsDeep(user, {
            active: true,
            twitch_id: null,
            avatar: null,
            birthDate: moment(),
            phoneNumber: null,
            roles: [],
            loginAttempts: 0,
            app_token: null,
            twitch_auth_token: null,
            twitch_auth_refresh_token: null,
            followers: [],
            subscribers: []
        });
    }

    setPassword(newPassword: string, callback: (err?: Error, user?: User) => void) {
        /// <summary>Updates the user's stored password hash</summary>
        /// <param name="newPassword" type="String">The new password to use for the user</param>
        /// <param name="callback" type="Function">A function to be called once the user's password has been updated</param>
        const passwordTest = /(?=^.{8,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;
        if (!passwordTest.test(newPassword || "")) return callback(new Error("Password didn\"t meet the minimum safe password requirements. Passwords should be at least 8 characters long, and contain at least 3 of the following categories: lowercase letters, uppercase letters, numbers, characters"));

        const hashed = require("crypto").createHash("sha512").update(settings.security.salt).update(newPassword).digest("hex");
        this.password = hashed;
        this.save(callback);
    }

    comparePassword(password: string): boolean {
        /// <summary>Checks whether a given password is correct for a user's account</summary>
        /// <param name="password" type="String">The password to validate against the user's password hash.</param>
        /// <returns type="Boolean"/>
        const hashed = require("crypto").createHash("sha512").update(settings.security.salt).update(password).digest("hex");
        return hashed == this.password;
    }
}
