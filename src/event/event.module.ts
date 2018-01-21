/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {EventController} from './event.controller';
import {EventService} from './event.service';
import {DatabaseModule} from "../database/database.module";
import {eventProviders} from "./event.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [EventController],
    components: [EventService, ...eventProviders],
})

export class EventModule {
}