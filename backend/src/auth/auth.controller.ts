import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto"
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Post('login')
    async validateUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
        return this.authService.validateUser(loginUserDto.login, loginUserDto.password)
    }
    
} 