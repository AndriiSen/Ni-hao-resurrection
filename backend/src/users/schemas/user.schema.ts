import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document

interface IUpdateUserInfo {
    name: string,
    lastname: string,
    middlename: string,
    district: string,
    city: string,
    phone: string,
    gitHub: string,
    linkedIn: string,
    about: string,
}
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

    @Prop({ type: Object })
    userInfo?: IUpdateUserInfo;

    @Prop({ type: Object })
    friendshipRequests?: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
