import {Module} from '@nestjs/common';
import {RegisterTokenModule} from "./register-token/register-token.module";
import {TwitchModule} from "./twitch/twitch.module";
import {GameModule} from './game/game.module';
import {PlatformModule} from './platform/platform.module';
import {EventModule} from './event/event.module';
import {databaseProviders} from "./database/database.providers";
import {DatabaseModule} from "./database/database.module";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule, UserModule, GameModule, PlatformModule, EventModule, TwitchModule, RegisterTokenModule,],
    controllers: [],
    components: [...databaseProviders],
})
export class ApplicationModule {
}
