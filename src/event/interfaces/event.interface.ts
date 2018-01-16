/**
 * Created by tdoret on 15/01/2018.
 */
import {Document} from 'mongoose';
import {IUser} from '../../User/interfaces/user.interface';
import {IGame} from '../../game/interfaces/game.interface';

export interface IEvent extends Document {
    readonly owner: IUser;
    readonly access_type: string;
    readonly event_type: string;
    readonly participants: IUser[];
    readonly participants_limit: number;
    readonly game: IGame;
    readonly winner: IUser;
    // TODO price
    readonly start_date: Date;
    readonly end_date: Date;
    readonly description: string;
    readonly image: string;
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}