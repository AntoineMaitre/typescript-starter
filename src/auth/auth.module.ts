import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {UserService} from "../user/user.service";
import {userProviders} from "../user/user.providers";
import {databaseProviders} from "../database/database.providers";

@Module({
    components: [AuthService, JwtStrategy, UserService, ...userProviders, ...databaseProviders],
    controllers: [AuthController],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule {
}