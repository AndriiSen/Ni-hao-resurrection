import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersRepository } from "src/users/users.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository]
})

export class AuthModule {}