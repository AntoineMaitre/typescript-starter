import {IUserDocument} from "../user/IUserDocument";
import {IGameDocument} from "../game/IGameDocument";

export interface IEventDocument {
    _id?: string;
    owner: IUserDocument;
    access_type: string;
    event_type: string;
    participants: IUserDocument[];
    participants_limit: number;
    game: IGameDocument;
    winner: IUserDocument;
    // TODO price
    start_date: Date;
    end_date: Date;
    description: string;
    image: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}