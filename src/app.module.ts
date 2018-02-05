import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {GameModule} from './game/game.module';
import {PlatformModule} from './platform/platform.module';
import {EventModule} from './event/event.module';
import {TwitchModule} from "./twitch/twitch.module";
import * as passport from 'passport';

@Module({
    imports: [AuthModule, UserModule, GameModule, PlatformModule, EventModule, TwitchModule, MongooseModule.forRoot('mongodb://dev:dev@ds119368.mlab.com:19368/event-esport')],
    controllers: [],
    components: [],
})
export class ApplicationModule implements NestModule{
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(//TODO refactor properly private route to check
                { path: '/user', method: RequestMethod.GET},
                { path: '/user', method: RequestMethod.PUT},
                { path: '/user', method: RequestMethod.DELETE},
                { path: '/game'},
                { path: '/event'},
                { path: '/platform'},
            );
    }
}
