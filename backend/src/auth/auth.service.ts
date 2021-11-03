import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/schemas/user.schema";



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
    
    async createUser(email: string, login: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            throw new ConflictException({
                statusCode: 409,
                message: 'This email is already registred'
            })
        }
        const newUserID = await this.usersRepository.generateId()
        return this.usersRepository.create({
            userId: newUserID + 1,
            date: String(Date.now()),
            email,
            login,
            password: await bcrypt.hash(password, +process.env.salt)
        });
    }
}