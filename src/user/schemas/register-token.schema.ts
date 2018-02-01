/**
 * Created by tdoret on 15/01/2018.
 */
import * as mongoose from 'mongoose';

export const RegisterTokenSchema = new mongoose.Schema({
    register_request_token: {type: String, required: false},
    created_at: {type: Date, required: false},
});