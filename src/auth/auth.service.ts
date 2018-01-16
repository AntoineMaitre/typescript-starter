import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {IUser} from "../user/interfaces/user.interface";

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

    async validateUser(signedUser: IUser): Promise<boolean> {
        // let user = await this.findOne(signedUser.id)
        // TODO put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}