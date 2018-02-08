/**
 * Created by tdoret on 15/01/2018.
 */
import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./user.providers";
import {JwtMiddleware} from "../common/middlewares/jwt.middleware";
import {TwitchModule} from "../twitch/twitch.module";
import {RegisterTokenModule} from "../register-token/register-token.module";

@Module({
    imports: [DatabaseModule, TwitchModule, RegisterTokenModule],
    controllers: [UserController],
    components: [UserService, ...userProviders],
    exports: [UserService, ...userProviders]
})

export class UserModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(
            {path: '/user', method: RequestMethod.GET}
        );
    }
}