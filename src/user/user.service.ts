/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, Inject} from '@nestjs/common';
import {IUser} from './interfaces/user.interface';
import {CreateUserDto} from './dto/create-user.dto';

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