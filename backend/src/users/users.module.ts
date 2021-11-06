import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [UsersRepository]
})

export class UsersModule { }