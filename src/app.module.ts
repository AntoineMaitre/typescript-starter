import {MiddlewaresConsumer, Module, NestModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {AuthController} from "./auth/auth.controller";
import {UserModule} from "./user/user.module";

@Module({
    imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://dev:dev@ds119368.mlab.com:19368/event-esport')],
    controllers: [AppController, AuthController],
    components: [],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes(AuthController);
    }
}