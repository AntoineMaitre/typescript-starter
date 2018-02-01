/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, Inject} from '@nestjs/common';
import {IUser} from './interfaces/user.interface';
import {CreateUserDto} from './dto/create-user.dto';
import {IRegisterToken} from "./interfaces/register-token.interface";
import * as randToken from 'rand-token';
import * as crypto from 'crypto';

@Component()
export class UserService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<IUser>) {
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findById(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<IUser[]> {
        return await this.userModel.find({username: username}).exec();
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({email: email}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
}

export class RegisterTokenService {
    constructor(@Inject('RegisterTokenModelToken') private readonly registerTokenModel: Model<IRegisterToken>) {
    }

    async createRegisterToken(): Promise<IRegisterToken> {
        const token = randToken.generator({source: crypto.randomBytes});
        const createdToken = new this.registerTokenModel({register_request_token: token.generate(16), created_at: new Date()});
        return await createdToken.save();
    }

    async handleRegisterToken(registerTokenString: string): Promise<boolean> {
        let registerToken = await this.registerTokenModel.find({register_request_token: registerTokenString}).exec();
        return await registerToken.length > 0;
    }
}