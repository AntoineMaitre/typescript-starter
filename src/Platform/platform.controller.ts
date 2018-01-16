/**
 * Created by tdoret on 15/01/2018.
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { Platform } from './interfaces/platform.interface';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('Platform')
@Controller('platform')
export class PlatformController {
    constructor(private readonly platformService: PlatformService) {}

}