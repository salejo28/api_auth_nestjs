import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    index: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    },
    create: {
        type: Date,
        default: Date.now
    }
})