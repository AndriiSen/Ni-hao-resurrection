import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { RegistrationService } from './registration.service';
import { Registration } from './schemas/registration.schema';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: createUserDto): Promise<Registration> {
    return this.registrationService.create(createUserDto);
  }
}
