import {MiddlewaresConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {AuthController} from "./auth/auth.controller";

@Module({
    imports: [AuthModule],
    controllers: [AppController, AuthController],
    components: [],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes(AuthController);
    }
