import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import {Component} from '@nestjs/common';
import {IUser} from "../user/interfaces/user.interface";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UserService} from "../user/user.service";

@Component()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async createToken(user: IUser) {
        // TODO make expires according to the config (better than this sh**)
        const expiresIn = '1h', secretOrKey = process.env.SECRET_KEY;
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

    async updateToken(user: IUser) {
        let token = await this.createToken(user);
        await this.userService.updateToken(user._id, token.access_token);
        return token;
    }

    async authenticateUser(userAuthDto: UserAuthDto): Promise<IUser> {
        let foundUser = await this.userService.findByEmail(userAuthDto.email);
        // check if user exists
        // compare passwords if user exists
        // return user if user exists
        // return auth error if user not found or if password doesn't match retrieved user
        if (!_.isNil(foundUser) && await this.comparePasswords(userAuthDto.password, foundUser.password)) {
            return foundUser;
        } else {
            return Promise.reject('Invalid credentials provided');
        }
    }

    private async comparePasswords(inPwd: string, userPwd): Promise<boolean> {
        // return bcrypt.compareSync(inPwd, userPwd);
        return inPwd === userPwd;
    }
}