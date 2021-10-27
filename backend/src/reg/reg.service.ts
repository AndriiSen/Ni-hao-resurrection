import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "../users/schemas/user.schema"
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from "src/users/users.repository";


@Injectable()
export class RegService {
    constructor(private readonly usersRepository: UsersRepository) { }
    async createUser(email: string, login: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            throw new ConflictException({
                statusCode: 409,
                message: 'This email is already registred'
            })
        }
        return this.usersRepository.create({
            userId: uuidv4(),
            date: new Date().toString(),
            email,
            login,
            password: await bcrypt.hash(password, +process.env.salt)
        });
    }
}