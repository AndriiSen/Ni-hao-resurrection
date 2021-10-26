import { IsEmail, IsNotEmpty, Matches, MinLength, Validate } from "class-validator";
let regexpPassword = new RegExp('^[a-zA-Z0-9]{6}$');


export class CreateUserDto {

    readonly userId: string;

    @IsNotEmpty()
    @MinLength(6, {
        message: 'Login is too short',
      })
    readonly login: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Matches(regexpPassword, {
        message: 'No special characters allowed and min length - 6'
    })
    readonly password: string;

    readonly date: string;
  }