/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, HttpException, HttpStatus, Inject, UnauthorizedException} from '@nestjs/common';
import {IUser} from './interfaces/user.interface';
import {CreateUserDto} from './dto/create-user.dto';
import {TwitchService} from "../twitch/twitch.service";
import {RegisterTokenService} from "./register-token.service";

@Component()
export class UserService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<IUser>,
                private readonly twitchService: TwitchService,
                private readonly registerTokenService: RegisterTokenService) {
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

    async create(createUserDto: CreateUserDto, state: string): Promise<IUser> {
        console.log(state)
        let isAuthorized = await this.registerTokenService.handleRegisterToken(state);
        console.log('create', isAuthorized)
        if(isAuthorized) {
            if(createUserDto.password !== createUserDto.passwordConfirm)
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: "password and confirmPassword is not equal",
                }, HttpStatus.BAD_REQUEST);

            //TODO check already used email
            let alreadyUsedEmail = false;
            if(alreadyUsedEmail)
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: "Email already used",
                }, HttpStatus.BAD_REQUEST);

            let followers, subscribers;
            followers = await this.twitchService
                .getChannelFollowers(createUserDto.twitch_id, createUserDto.accessToken)
                .catch(ex => { followers = undefined; console.log('exception on getChannelFollowers', ex)});

            subscribers = await this.twitchService
                .getChannelSubscriptions(createUserDto.twitch_id, createUserDto.accessToken)
                .catch(ex => { subscribers = undefined; console.log('exception on getChannelSubscriptions',ex)});

            const createdUser = new this.userModel({
                twitch_id: createUserDto.twitch_id,
                twitch_auth_token: createUserDto.accessToken,
                twitch_auth_refresh_token: createUserDto.refreshToken,
                followers: followers ? followers.follows : [],
                subscribers: subscribers ? subscribers : [],
                //TODO ajouter app_token en fonction de l'implem d'Antoine :)
                firstname: null,//sanitizer.escape(userToAdd.username),
                lastname: null, //sanitizer.escape(userToAdd.username),
                username: createUserDto.username,
                avatar: createUserDto.avatar,
                email: createUserDto.email,
                password: createUserDto.password,
                roles: createUserDto.role,

                birthDate: null,
                phoneNumber: null,
            });
            return await createdUser.save();
        } else {
            throw new UnauthorizedException();
        }

    }
}