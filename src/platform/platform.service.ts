/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, Inject} from '@nestjs/common';
import {IPlatform} from './interfaces/platform.interface';

@Component()
export class PlatformService {
    constructor(@Inject('PlatformModelToken') private readonly platformModel: Model<IPlatform>) {
    }

}