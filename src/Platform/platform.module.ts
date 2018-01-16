/**
 * Created by tdoret on 15/01/2018.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {PlatformController} from './platform.controller';
import {PlatformService} from './platform.service';
import {PlatformSchema} from './schemas/platform.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Platform', schema: PlatformSchema }])],
    controllers: [PlatformController],
    components: [PlatformService],
})

export class PlatformrModule {}