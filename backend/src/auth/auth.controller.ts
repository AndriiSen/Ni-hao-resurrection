import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { };

    @Post()
    async validateAndLogin(@Body() loginUserDto: AuthUserDto): Promise<User> {
        return this.authService.validateAndLogin(loginUserDto.login, loginUserDto.password);
    }

}