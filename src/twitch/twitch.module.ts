import {Module} from '@nestjs/common';
import {TwitchService} from './twitch.service';
import {TwitchController} from "./twitch.controller";
import {DatabaseModule} from "../database/database.module";
import {RegisterTokenModule} from "../register-token/register-token.module";

@Module({
    imports: [DatabaseModule, RegisterTokenModule],
    controllers: [TwitchController],
    components: [TwitchService],
    exports: [TwitchService]
})

export class TwitchModule {
}