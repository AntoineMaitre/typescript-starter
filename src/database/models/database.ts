import {Core, Model} from "iridium";
import {User} from "./user/user";
import {IUserDocument} from "./user/IUserDocument";
import {IFollowerDocument} from "./follower/IFollowerDocument";
import {Follower} from "./follower/follower";

export class Database extends Core {
    Users = new Model<IUserDocument, User>(this, User);
    Followers = new Model<IFollowerDocument, Follower>(this, Follower);
    // TODO add missing models
}