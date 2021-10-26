import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersRepository } from "src/users/users.repository";
import { RegController } from "./reg.controller";
import { RegService } from "./reg.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    controllers: [RegController],
    providers: [RegService, UsersRepository]
})

export class RegModule {}