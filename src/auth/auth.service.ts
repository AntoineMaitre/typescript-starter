import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import {Component} from '@nestjs/common';
import {IUser} from "../user/interfaces/user.interface";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UserService} from "../user/user.service";
import * as moment from "moment";
import * as bcrypt from "bcrypt";
import * as config from 'config';
import {getLogger} from "log4js";

const logger = getLogger('service.auth');

@Component()
export class AuthService {
    private tokenDuration;

    constructor(private readonly userService: UserService) {
        this.initialize();
    }

    async createToken(user: IUser) {
        const expiresIn = this.tokenDuration.asSeconds(), secretOrKey = process.env.SECRET_KEY;
        const toBeSignedUser: any = {
            email: user.email,
            username: user.username,
            twitchId: user.twitch_id,
            userId: user._id
        };
        const token = jwt.sign(toBeSignedUser, secretOrKey, {expiresIn});

        return {
            expires_in: expiresIn,
            access_token: token,
            user_id: user._id
        };
    }

    /**
     * @description Authenticates a user against database based on its email and password
     * 1. check if user exists
     * 2. compare passwords if user exists
     * 3. return user if user exists
     * 3.1. return auth error if user not found or if password doesn't match retrieved user
     * @param {UserAuthDto} userAuthDto
     * @returns {Promise<IUser>}
     */
    async authenticateUser(userAuthDto: UserAuthDto): Promise<IUser> {
        let foundUser = await this.userService.findByEmail(userAuthDto.email);
        if (!_.isNil(foundUser) && await this.comparePasswords(userAuthDto.password, foundUser.password)) {
            return foundUser;
        } else {
            return Promise.reject('Invalid credentials provided');
        }
    }

    async updateToken(user: IUser) {
        let token = await this.createToken(user);
        await this.userService.updateToken(user._id, token.access_token);
        return token;
    }

    /**
     * @description Initializes the token settings (checks the validity of settings from config file)
     */
    private initialize() {
        let configTokenDuration = config.server.auth.tokenDuration;
        let isConfigValid = !!configTokenDuration;

        if (isConfigValid) {
            try {
                this.tokenDuration = moment.duration(configTokenDuration.value, configTokenDuration.unit);
                isConfigValid = this.tokenDuration.asMilliseconds() !== 0;
            } catch (e) {
                isConfigValid = false;
            }
        }

        if (!isConfigValid) {
            logger.warn('Invalid token duration configuration: ' + configTokenDuration);
            this.tokenDuration = moment.duration(2, 'h');
        }

        logger.info('Token duration set to: ' + this.tokenDuration.humanize());
    }

    private async comparePasswords(inPwd: string, userPwd): Promise<boolean> {
        return await bcrypt.compareSync(inPwd, userPwd);
    }
}