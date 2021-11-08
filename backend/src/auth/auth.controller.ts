import { Body, Controller, Get, Param, Post, Put, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/schemas/user.schema";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";







@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { };

    @Get('user/:id')
    async getUserProfile(@Param('id') userId: number ) {
        return this.authService.getUserProfile(userId)
    }

    @Get('auth/login')
    async validateAndLogin(@Body() loginUserDto: AuthUserDto, @Res() res: Response): Promise<any> {
        const user = await this.authService.validateAndLogin(loginUserDto.email, loginUserDto.password)
        if (!user) {
            throw new UnauthorizedException()
        }
        const jwtToken = await this.authService.generateJwtToken(loginUserDto.email)
        res.setHeader('Auth-Token', jwtToken)
        return res.json(user)
    }

    @Post('auth/register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.createUser(createUserDto.email, createUserDto.login, createUserDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Put('user/:id/update')
    async updateUserInfo(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.updateUserInfo(userId, updateUserDto.userInfo)
    }
}
