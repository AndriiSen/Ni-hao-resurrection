import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({login});
        if(!user) {
            throw new UnauthorizedException()
        } 
        const passwordIsValid = await bcrypt.compare (password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException()
        }
        return user
    }

}