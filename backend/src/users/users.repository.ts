import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async generateId() {
        return this.userModel.count()
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(userFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user)
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, updateInfo: string): Promise<User> {
        return this.userModel.findOneAndUpdate(userFilterQuery, { userInfo: updateInfo });
    }
}