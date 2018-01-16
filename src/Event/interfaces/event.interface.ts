/**
 * Created by tdoret on 15/01/2018.
 */
import { Document } from 'mongoose';
import {User} from '../../User/interfaces/user.interface';
import {Game} from '../../Game/interfaces/game.interface';

export interface Event extends Document {
    readonly owner: User;
    readonly access_type: string;
    readonly event_type: string;
    readonly participants: User[];
    readonly participants_limit: number;
    readonly game: Game;
    readonly winner: User;
    // TODO price
    readonly start_date: Date;
    readonly end_date: Date;
    readonly description: string;
    readonly image: string;
    readonly active: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}