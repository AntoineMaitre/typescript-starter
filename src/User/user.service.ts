/**
 * Created by tdoret on 15/01/2018.
 */
import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
// import { CreateCatDto } from './dto/create-cat.dto';
import { UserSchema } from './schemas/user.schema';

@Component()
export class UserService {
    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
}