import { createUserDto } from './dto/create-user.dto';
import { Reg, RegDocument } from './schemas/reg.schema';
import { Model } from 'mongoose';
export declare class RegService {
    private regModel;
    constructor(regModel: Model<RegDocument>);
    private users;
    getAllUsers(): Promise<Reg[]>;
    create(createDto: createUserDto): Promise<Reg>;
    removeUsers(): Promise<Reg[]>;
}
