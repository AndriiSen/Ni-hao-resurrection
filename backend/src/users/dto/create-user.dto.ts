import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    readonly userId: string;
    readonly login: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
    readonly date: string;
  }