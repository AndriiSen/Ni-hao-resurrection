import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }

    async validateAndLogin(login: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ login });
        if (!user) {
            throw new UnauthorizedException()
        }
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException()
        }

        const jwt = await this.jwtService.signAsync({ login: user.login })

        return {
            statusCode: 200,
            message: 'Success',
            userData: user,
            jwt: jwt
        }
    }

}