import * as passport from 'passport';
import {MiddlewaresConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {UserService} from "../user/user.service";
import {userProviders} from "../user/user.providers";
import {databaseProviders} from "../database/database.providers";

@Module({
    components: [AuthService, JwtStrategy, UserService, ...userProviders, ...databaseProviders],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/auth/authorized', method: RequestMethod.ALL});
    }
}