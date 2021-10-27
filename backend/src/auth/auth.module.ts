import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersRepository } from "src/users/users.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
require('dotenv').config();


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository]
})

export class AuthModule { }