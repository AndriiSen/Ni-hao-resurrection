import { Document } from "mongoose";
export declare type RegDocument = Reg & Document;
export declare class Reg {
    login: string;
    email: string;
    password: string;
    date: string;
}
export declare const RegSchema: import("mongoose").Schema<Document<Reg, any, any>, import("mongoose").Model<Document<Reg, any, any>, any, any, any>, {}>;
