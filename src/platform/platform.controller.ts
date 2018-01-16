/**
 * Created by tdoret on 15/01/2018.
 */
import {Controller} from '@nestjs/common';
import {PlatformService} from './platform.service';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('Platform')
@Controller('platform')
export class PlatformController {
    constructor(private readonly platformService: PlatformService) {}

}