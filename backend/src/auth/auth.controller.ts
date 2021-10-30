import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto"
import { AuthService } from "./auth.service";
import { Response } from "express";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";




@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { };

    @Post()
    async validateAndLogin(@Body() loginUserDto: AuthUserDto, @Res() res: Response): Promise<any> {
        const user = await this.authService.validateAndLogin(loginUserDto.email, loginUserDto.password)
        if (!user) {
            throw new UnauthorizedException()
        }
        const jwtToken = await this.authService.generateJwtToken(loginUserDto.email)
        res.setHeader('JWT', jwtToken)
        return res.json(user)
    }

    // Тест работы гварда
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async getSomeData (): Promise<any> {
        return 'Here is your data, come and get it.'
    }

}
