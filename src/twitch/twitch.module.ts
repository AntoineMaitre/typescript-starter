import {Module} from '@nestjs/common';
import {TwitchService} from './twitch.service';
import {TwitchController} from "./twitch.controller";
import {RegisterTokenService} from "../user/user.service";
import {userProviders} from "../user/user.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [TwitchController],
    components: [TwitchService, RegisterTokenService, ...userProviders],

})

export class TwitchModule {
}