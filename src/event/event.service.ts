/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, Inject} from '@nestjs/common';
import {IEvent} from "./interfaces/event.interface";

@Component()
export class EventService {
    constructor(@Inject('EventModelToken') private readonly eventModel: Model<IEvent>) {
    }
}