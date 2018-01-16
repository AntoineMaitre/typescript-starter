/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    platform_type: { type: Number, required: true },
    releaseDate: { type: Date, required: true},
    multiPlayer: { type: Boolean, required: true },
    description: { type: String, required: true },
    editor: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});