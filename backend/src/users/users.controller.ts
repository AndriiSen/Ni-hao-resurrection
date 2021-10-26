import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get(':login')
    async getUser(@Param('login') login: string): Promise<User> {
        return this.usersService.getUserByLogin(login)
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto.email, createUserDto.login, createUserDto.password);
    }

    @Patch(':userId')
    async updateUser(@Param('UserId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(userId, updateUserDto);
    }
}