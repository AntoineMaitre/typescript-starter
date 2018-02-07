import * as passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Component} from '@nestjs/common';
import {UserService} from '../../user/user.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly userService: UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromHeader('authorization'),
                passReqToCallback: true,
                secretOrKey: process.env.SECRET_KEY,
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this)
    }

    public async verify(req, payload, done) {
        return await this.userService.findById(payload.userId)
            .then(signedUser => done(null, signedUser))
            .catch(err => done('Invalid authorization', false))
    }
}