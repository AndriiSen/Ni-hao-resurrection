import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/create-user.dto';
import {
  Registration,
  RegistrationDocument,
  RegistrationSchema,
} from './schemas/registration.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

const dotenv = require('dotenv').config()

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel: Model<RegistrationDocument>,
  ) {}

  async create(createDto: createUserDto): Promise<Registration> {
    const saltRounds = +process.env.salt
    const newRegistration = new this.registrationModel({
      ...createDto,
      date: new Date().toString(),
      password: await bcrypt.hash('password', saltRounds),
    });
    return newRegistration.save();
  }
}
