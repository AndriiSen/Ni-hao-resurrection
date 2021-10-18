import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type RegistrationDocument = Registration & Document;

@Schema()
export class Registration {
  @Prop()
  login: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  date: string;
}
export const RegistrationSchema = SchemaFactory.createForClass(Registration);
