import { Body, Controller, Get, Header, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/schemas/user.schema";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UsersRepository } from "src/users/users.repository";
import { Headers } from '@nestjs/common';


@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService, private usersRepository: UsersRepository
    ) { };
    @Get('/users')
    async getAllUsers() {
        return this.usersRepository.find({})
    }

    @Get('user/:id')
    async getUserProfile(@Param('id') userId: number) {
        return this.authService.getUserProfile(userId)
    }

    @Post('auth/login')
    async validateAndLogin(@Body() loginUserDto: AuthUserDto, @Res() res: Response): Promise<any> {
        const user = await this.authService.validateAndLogin(loginUserDto.email, loginUserDto.password)
        if (!user) {
            throw new UnauthorizedException()
        }
        const jwtToken = await this.authService.generateJwtToken(user.userData.userId)
        res.setHeader('Auth-Token', jwtToken)
        res.setHeader('Access-Control-Expose-Headers', 'Auth-Token')
        return res.json(user)
    }

    @Post('auth/register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.createUser(createUserDto.email, createUserDto.login, createUserDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Put('user/:id/update')
    async updateUserInfo(@Headers() headers, @Body() updateUserDto: UpdateUserDto) {
        const token = headers.authorization
        return this.authService.updateUserInfo(token, updateUserDto)
    }

}
