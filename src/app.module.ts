import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {GameModule} from './game/game.module';
import {PlatformModule} from './platform/platform.module';
import {EventModule} from './event/event.module';
import {TwitchModule} from "./twitch/twitch.module";
import {userProviders} from "./user/user.providers";
import {databaseProviders} from "./database/database.providers";
import {DatabaseModule} from "./database/database.module";

@Module({
    imports: [DatabaseModule, AuthModule, UserModule, GameModule, PlatformModule, EventModule, TwitchModule],
    controllers: [],
    components: [...userProviders, ...databaseProviders],
})
export class ApplicationModule {
}
