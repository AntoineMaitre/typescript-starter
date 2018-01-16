/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IPlatform} from './interfaces/platform.interface';
import {PlatformSchema} from './schemas/platform.schema';

@Component()
export class PlatformService {
    constructor(@InjectModel(PlatformSchema) private readonly platformModel: Model<IPlatform>) {
    }

}