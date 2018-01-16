/**
 * Created by tdoret on 15/01/2018.
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {EventService} from './event.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('Event')
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
}