import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){}

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async getUserByLogin(login: string): Promise<User | undefined> {
        return this.usersRepository.findOne({login});
    }

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({login});
        if(!user) {
            throw new UnauthorizedException()
        }
        return user
    }

}