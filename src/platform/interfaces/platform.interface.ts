/**
 * Created by tdoret on 15/01/2018.
 */
import {Document} from 'mongoose';
import {IUser} from '../../User/interfaces/user.interface';
import {IGame} from '../../game/interfaces/game.interface';

export interface IPlatform extends Document {
    readonly user: IUser;
    readonly plateform_type: PlatformType;
    readonly platform_customer_id: string;
    readonly platform_auth_token: string;
    readonly login: string;
    readonly games: IGame[];
    readonly friends: string[];
    readonly is_connected: boolean;
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}

export enum PlatformType {
    STEAM = 1,
    BNET,
    RIOT,
}