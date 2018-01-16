import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {User} from "../user/interfaces/user.interface";

@Component()
export class AuthService {
    async createToken() {
        const expiresIn = 60 * 60, secretOrKey = 'secret';
        const user = {email: 'thisis@example.com'};
        const token = jwt.sign(user, secretOrKey, {expiresIn});
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser: User): Promise<boolean> {
        // let user = await this.findOne(signedUser.id)
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}