/**
 * Created by tdoret on 15/01/2018.
 */
import {Component} from '@nestjs/common';
import {User} from "../database/models/user/user";
import {IService} from "../interfaces/IService";
import {CreateOptions, QueryOptions, RemoveOptions} from "iridium";
import {IUserDocument} from "../database/models/user/IUserDocument";
import {Database} from "../database/models/database";
import {IridiumDatabaseService} from "../database/iridium.database.service";

@Component()
export class UserService implements IService<User> {
    private _database: Database;


    constructor(private readonly DatabaseService: IridiumDatabaseService) {
        this.ConnectToDb();
    }

    find(conditions?: { [p: string]: number }, fields?: { [p: string]: number }): Promise<User[]> {
        return undefined;
    }

    findOne(id: string, options?: QueryOptions): Promise<User> {
        return undefined;
    }

    create(payload: IUserDocument | IUserDocument[], options?: CreateOptions): Promise<User[] | User> {
        return undefined;
    }

    destroy(conditions: string | { [p: string]: object } | { _id?: string }, options?: RemoveOptions): Promise<number> {
        return undefined;
    }


    // async findAll(): Promise<IUser[]> {
    //     return await this.userModel.find().exec();
    // }
    //
    // async findById(id: string): Promise<IUser> {
    //     return await this.userModel.findById(id).exec();
    // }
    //
    // async findByUsername(username: string): Promise<IUser[]> {
    //     return await this.userModel.find({username: username}).exec();
    // }
    //
    // async findByEmail(email: string): Promise<IUser> {
    //     return await this.userModel.findOne({email: email}).exec();
    // }

    // async create(createUserDto: CreateUserDto): Promise<IUser> {
    //     const createdUser = new this.userModel(createUserDto);
    //     return await createdUser.save();
    // }

    private async ConnectToDb() {
        try {
            this._database = await this.DatabaseService.database();
            await this.seed();
        } catch (error) {
            return console.log(error);
        }
    }

    private async seed() {
        await this._database.connect();
        const cursor = this._database.Users.find();
        const count = await cursor.count();
        if (count <= 0) {
            const users = await this._database.Users.insert([]);
            console.log('seeded users', users);
            return this._database.close();
        }
        console.log('db already seeded');
        return this._database.close();
    }

}