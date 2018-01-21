/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {PlatformController} from './platform.controller';
import {PlatformService} from './platform.service';
import {DatabaseModule} from "../database/database.module";
import {platformProviders} from "./platform.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [PlatformController],
    components: [PlatformService, ...platformProviders],
})

export class PlatformModule {
}