/**
 * Created by tdoret on 15/01/2018.
 */
import { Document } from 'mongoose';
import { User } from '../../User/interfaces/user.interface';
import {Game} from '../../Game/interfaces/game.interface';

export interface Platform extends Document {
    readonly user: User;
    readonly plateform_type: PlatformType;
    readonly platform_customer_id: string;
    readonly platform_auth_token: string;
    readonly login: string;
    readonly games: Game[];
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