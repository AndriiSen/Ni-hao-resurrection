import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/create-user.dto';
import {
  Registration,
  RegistrationDocument,
  RegistrationSchema,
} from './schemas/registration.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel: Model<RegistrationDocument>,
  ) {}

  async create(createDto: createUserDto): Promise<Registration> {
    const newRegistration = new this.registrationModel({
      ...createDto,
      date: new Date().toString(),
      password: await argon2.hash('password'),
    });
    return newRegistration.save();
  }
}
