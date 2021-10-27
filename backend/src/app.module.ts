import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegModule } from './reg/reg.module';
import { LoggerMiddleware } from './_middleware/logger.middleware';
require('dotenv').config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    RegModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('reg')
  }
 }
