/**
 * Created by tdoret on 15/01/2018.
 */
import { Document } from 'mongoose';

export interface RegisterToken extends Document {
    readonly register_request_token: string;
    readonly created_at: Date;
}