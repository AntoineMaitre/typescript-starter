/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {UserSchema} from './schemas/user.schema';
import {CreateUserDto} from './dto/create-user.dto';

@Component()
export class UserService {
    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<User[]> {
        return await this.userModel.find({username: username}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
}