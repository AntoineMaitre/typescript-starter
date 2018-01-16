/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {EventSchema} from './schemas/event.schema';
import {IEvent} from "./interfaces/event.interface";

@Component()
export class EventService {
    constructor(@InjectModel(EventSchema) private readonly eventModel: Model<IEvent>) {
    }
}