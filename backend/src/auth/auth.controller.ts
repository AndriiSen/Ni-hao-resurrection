import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async validateAndLogin(
    @Body() loginUserDto: AuthUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.authService.validateAndLogin(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwtToken = await this.authService.generateJwtToken(
      loginUserDto.email,
    );
    res.setHeader('Auth-Token', jwtToken);
    res.setHeader('Access-Control-Expose-Headers', 'Auth-Token');
    return res.json(user);
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(
      createUserDto.email,
      createUserDto.login,
      createUserDto.password,
    );
  }
}
