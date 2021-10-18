import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/create-user.dto';
import { Reg, RegDocument, RegSchema } from './schemas/reg.schema';
import { Model, now } from 'mongoose';
import * as argon2 from "argon2";
@Injectable()
export class RegService {
    constructor(@InjectModel(Reg.name) private regModel: Model<RegDocument>){

    }
    private users = []

   async getAllUsers(): Promise<Reg[]> {
        return this.regModel.find().exec()
    }
    
   async create(createDto: createUserDto): Promise<Reg> {
    const newReg = new this.regModel({
      ...createDto,
      date: new Date().toString(),
      password: await argon2.hash('password'),
       
    })
        return newReg.save()
    }

    async removeUsers(): Promise<Reg[]> {
        return this.regModel.remove({})
    }
}
