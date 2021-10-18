import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import {
  Registration,
  RegistrationSchema,
} from './schemas/registration.schema';

@Module({
  providers: [RegistrationService],
  controllers: [RegistrationController],
  imports: [
    MongooseModule.forFeature([
      { name: Registration.name, schema: RegistrationSchema },
    ]),
  ],
})
export class RegistrationModule {}
