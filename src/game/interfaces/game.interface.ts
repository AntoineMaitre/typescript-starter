/**
 * Created by tdoret on 15/01/2018.
 */
import {Document} from 'mongoose';
import {PlatformType} from '../../platform/interfaces/platform.interface';

export interface IGame extends Document {
    readonly name: string;
    readonly platform_type: PlatformType;
    readonly releaseDate: Date;
    readonly multiPlayer: boolean;
    readonly description: string;
    readonly editor: string;
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}
