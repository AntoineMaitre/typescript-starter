import {IUserDocument} from "../user/IUserDocument";
import {IGameDocument} from "../game/IGameDocument";

export interface IPlatformDocument {
    _id?: string;
    user: IUserDocument;
    plateform_type: PlatformType;
    platform_customer_id: string;
    platform_auth_token: string;
    login: string;
    games: IGameDocument[];
    friends: string[];
    is_connected: boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export enum PlatformType {
    STEAM = 1,
    BNET,
    RIOT,
}