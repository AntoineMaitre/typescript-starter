/**
 * Created by tdoret on 15/01/2018.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {EventController} from './event.controller';
import {EventService} from './event.service';
import {EventSchema} from './schemas/event.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])],
    controllers: [EventController],
    components: [EventService],
})

export class EventModule {}