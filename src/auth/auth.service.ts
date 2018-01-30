import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as _ from 'lodash';
import {Component} from '@nestjs/common';
import {IUser} from "../user/interfaces/user.interface";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UserService} from "../user/user.service";

@Component()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    createToken(user: IUser) {
        const expiresIn = config.get('server.auth.tokenDuration.value'), secretOrKey = 'secret';
        const toBeSignedUser: any = {
            email: user.email,
            username: user.username,
            twitchId: user.twitch_id
        };
        const token = jwt.sign(toBeSignedUser, secretOrKey, {expiresIn});
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser: IUser): Promise<boolean> {
        // let user = await this.findOne(signedUser.id)
        // TODO put some validation logic here
        // for example query user by id / email / username
        return true;
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
            return Promise.reject({errorCode: 401, errorMessage: 'User not found or incorrect password'});
        }
    }

    private async comparePasswords(inPwd: string, userPwd): Promise<boolean> {
        // TODO implement salt/hash password logic to compare pwds
        return inPwd === userPwd;
    }
}