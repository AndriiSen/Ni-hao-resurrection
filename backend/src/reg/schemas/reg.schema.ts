import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";        
export type RegDocument = Reg & Document


@Schema()
export class Reg {
    @Prop()
    login: string

    @Prop()
    email: string

    @Prop()
    password:string
    
     @Prop()
    date: string  

} 
export const RegSchema = SchemaFactory.createForClass(Reg)

function BeforeInsert() {
    throw new Error("Function not implemented.");
}

