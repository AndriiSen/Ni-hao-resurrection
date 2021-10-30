import { Body, Controller, Header, Post, Res } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { AuthService } from "./auth.service";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";




@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { };

    @Post()
    async validateAndLogin(@Body() loginUserDto: AuthUserDto, @Res() res: Response): Promise<any> {
        const user = await this.authService.validateAndLogin(loginUserDto.email, loginUserDto.password)
        const jwtToken = await this.jwtService.signAsync({ email: user.email })
        res.setHeader('JWT', jwtToken)
        return res.json(user)
    }

}
