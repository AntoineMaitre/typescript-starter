/**
 * Created by tdoret on 15/01/2018.
 */
import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./user.providers";
import {JwtMiddleware} from "../common/middlewares/jwt.middleware";
import {databaseProviders} from "../database/database.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [UserService, ...userProviders, ...databaseProviders]
})

export class UserModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(
            {path: '/user', method: RequestMethod.ALL}
        );
    }
}