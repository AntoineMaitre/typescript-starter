import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {GameModule} from './game/game.module';
import {PlatformModule} from './platform/platform.module';
import {EventModule} from './event/event.module';
import {TwitchModule} from "./twitch/twitch.module";

@Module({
    imports: [AuthModule, UserModule, GameModule, PlatformModule, EventModule, TwitchModule, MongooseModule.forRoot('mongodb://dev:dev@ds119368.mlab.com:19368/event-esport')],
    controllers: [],
    components: [],
})
export class ApplicationModule {
}
