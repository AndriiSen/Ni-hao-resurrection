import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) { }

    async validateAndLogin(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException()
        }
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException()
        }
        return {
            statusCode: 200,
            message: 'Success',
            userData: user
        }
    }

    async generateJwtToken(email: string): Promise<any> {
        const jwtToken = await this.jwtService.signAsync({ email: email })
        return jwtToken
    }

}