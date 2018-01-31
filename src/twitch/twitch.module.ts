/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {TwitchService} from './twitch.service';
import {DatabaseModule} from "../database/database.module";
import {TwitchController} from "./twitch.controller";

@Module({
    imports: [],
    controllers: [TwitchController],
    components: [TwitchService],
})

export class TwitchModule {
}