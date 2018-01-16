/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PlatformSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    platform_type: { type: Number, required: true },
    platform_customer_id: { type: String, required: true},
    platform_auth_token: { type: String, required: true},
    login: { type: String, required: true},
    games: {type: [{type: Schema.Types.ObjectId, ref: 'Game', required: true}]},
    friends: [{type: String, required: true}],
    is_connected: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});

