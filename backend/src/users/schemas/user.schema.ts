import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    userId: number;

    @Prop()
    login: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    date: string;
}

export const UserSchema = SchemaFactory.createForClass(User);