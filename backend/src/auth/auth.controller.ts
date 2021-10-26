import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async validateUser(@Body() loginUserDto: AuthUserDto): Promise<User> {
        return this.authService.validateUser(loginUserDto.login, loginUserDto.password)
    }
    
} 