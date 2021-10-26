import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/schemas/user.schema";
import { RegService } from "./reg.service";



@Controller('reg')
export class RegController {
    constructor (private readonly regService: RegService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.regService.createUser(createUserDto.email, createUserDto.login, createUserDto.password);
    }
}