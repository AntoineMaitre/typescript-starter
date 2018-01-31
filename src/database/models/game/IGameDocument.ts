import {PlatformType} from "../platform/IPlatformDocument";

export interface IGameDocument {
    _id?: string;
    name: string;
    platform_type: PlatformType;
    releaseDate: Date;
    multiPlayer: boolean;
    description: string;
    editor: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}