export interface ITwitchUserDocument {
    _id?: string;
    display_name: string;
    name: string;
    type: string;
    bio: string;
    created_at: Date;
    updated_at: Date;
    logo: string;
}