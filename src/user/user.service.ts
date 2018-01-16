/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IUser} from './interfaces/user.interface';
import {UserSchema} from './schemas/user.schema';
import {CreateUserDto} from './dto/create-user.dto';

@Component()
export class UserService {
    constructor(@InjectModel(UserSchema) private readonly userModel: Model<IUser>) {
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

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
}