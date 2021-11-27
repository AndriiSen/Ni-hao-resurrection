import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document

interface IUpdateUserInfo {
    name: string,
    lastname: string,
    nikname: string,
    district: string,
    city: string,
    tuningStyle: string,
    bodyType: string,
    brand: string,
    model: string,
    year: string,
    fuelType: string,
    transmission: string,
    engineVolume: string,
    purchaseStory: string,
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
}

export const UserSchema = SchemaFactory.createForClass(User);
