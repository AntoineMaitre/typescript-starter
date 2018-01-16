/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const EventSchema = new Schema({
    owner: {type: {type: Schema.Types.ObjectId, ref: 'User', required: true}},
    access_type: { type: String, required: true },
    event_type: { type: String, required: true },
    participants: {type: [{type: Schema.Types.ObjectId, ref: 'User', required: true}]},
    participants_limit: { type: Number, required: true },
    game: {type: {type: Schema.Types.ObjectId, ref: 'Game', required: true}},
    winner: {type: {type: Schema.Types.ObjectId, ref: 'User', required: true}},
    // TODO Price
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    description: { type: String, required: false },
    image: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});