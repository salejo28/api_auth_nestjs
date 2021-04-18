import { Document } from "mongoose";

export interface IProduct extends Document {
    readonly index: number;
    readonly title: string;
    readonly description: string;
    readonly user_id: string
    readonly create: Date
}