import * as mongoose from "mongoose";

export const FollowerSchema = new mongoose.Schema({
    created_at: {type: Date, required: false},
    notifications: {type: Boolean, required: false},
    user: {
        display_name: {type: String, required: false},
        _id: {type: String, required: false},
        name: {type: String, required: false},
        type: {type: String, required: false},
        bio: {type: String, required: false},
        created_at: {type: Date, required: false},
        updated_at: {type: Date, required: false},
        logo: {type: String, required: false}
    }
});