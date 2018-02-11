/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, HttpException, HttpStatus, Inject, UnauthorizedException} from '@nestjs/common';
import {IUser} from './interfaces/user.interface';
import {CreateUserDto} from './dto/create-user.dto';
import {TwitchService} from "../twitch/twitch.service";
import {RegisterTokenService} from "../register-token/register-token.service";
import {getLogger} from "log4js";
import * as bcrypt from 'bcrypt';

const logger = getLogger('service.user');

@Component()
export class UserService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<IUser>,
                private readonly registerTokenService: RegisterTokenService,
                private readonly twitchService: TwitchService) {
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findById(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({email: email}).exec();
    }

    async updateToken(userId: string, token: string): Promise<any> {
        return await this.userModel.findByIdAndUpdate(userId, {app_token: token}).exec();
    }

    async findByUsername(username: string): Promise<IUser[]> {
        return await this.userModel.find({username: username}).exec();
    }

    async create(createUserDto: CreateUserDto, state: string): Promise<IUser> {
        if (await this.registerTokenService.handleRegisterToken(state)) {
            if (createUserDto.password !== createUserDto.passwordConfirm)
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: "password and confirmPassword are not equal",
                }, HttpStatus.BAD_REQUEST);

            if (this.isAlreadyTakenEmail(createUserDto.email))
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: "Email already used",
                }, HttpStatus.BAD_REQUEST);

            let followers, subscribers;
            followers = await this.twitchService
                .getChannelFollowers(createUserDto.twitch_id, createUserDto.accessToken)
                .catch(ex => {
                    followers = undefined;
                    logger.log('exception on getChannelFollowers', ex)
                });

            subscribers = await this.twitchService
                .getChannelSubscriptions(createUserDto.twitch_id, createUserDto.accessToken)
                .catch(ex => {
                    subscribers = undefined;
                    logger.log('exception on getChannelSubscriptions', ex)
                });

            const createdUser = new this.userModel({
                twitch_id: createUserDto.twitch_id,
                twitch_auth_token: createUserDto.accessToken,
                twitch_auth_refresh_token: createUserDto.refreshToken,
                followers: followers ? followers.follows : [],
                subscribers: subscribers ? subscribers : [],
                firstname: null,
                lastname: null,
                username: createUserDto.username,
                avatar: createUserDto.avatar,
                email: createUserDto.email,
                password: await bcrypt.hash(createUserDto.password, 10),
                roles: createUserDto.role,
                birthDate: null,
                phoneNumber: null,
            });
            return await createdUser.save();
        } else {
            throw new UnauthorizedException();
        }
    }

    async isAlreadyTakenEmail(email: string) {
        await this.findByEmail(email)
    }
}