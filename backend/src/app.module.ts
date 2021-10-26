import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';



const dotenv = require('dotenv').config();
@Module({
  imports: [
    RegistrationModule, 
    MongooseModule.forRoot(process.env.DB_URI), 
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
