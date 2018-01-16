import {MiddlewaresConsumer, Module, NestModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {AuthController} from "./auth/auth.controller";
import {UserModule} from "./user/user.module";
import {UserModule} from './User/user.module';
import {GameModule} from './Game/game.module';
import {PlatformrModule} from './Platform/platform.module';
import {EventModule} from './Event/event.module';

@Module({
    imports: [AuthModule, UserModule, GameModule, PlatformrModule, EventModule, MongooseModule.forRoot('mongodb://dev:dev@ds119368.mlab.com:19368/event-esport')],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
