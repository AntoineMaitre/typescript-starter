import * as passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Component, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromHeader('access_token'),
                passReqToCallback: true,
                secretOrKey: process.env.SECRET_KEY,
            },
            async (req, payload, next) => await this.handleToken(req, payload, next),
        );
        passport.use(this);
    }

    public async handleToken(req, payload, done) {
        console.log('handle token payload')
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done(new UnauthorizedException(), false);
        }
        done(null, payload);
    }
}