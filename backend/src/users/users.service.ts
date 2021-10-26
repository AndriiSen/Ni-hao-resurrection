import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./schemas/user.schema";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserByLogin(login: string): Promise<User | undefined> {
        return this.usersRepository.findOne({login});
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(email: string, login: string, password: string): Promise<User> {
        return this.usersRepository.create({
            userId: uuidv4(),
            date: new Date().toString(),
            email,
            login,
            password: await bcrypt.hash(password, +process.env.salt)
        });
    }
    async updateUser(userId:string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}