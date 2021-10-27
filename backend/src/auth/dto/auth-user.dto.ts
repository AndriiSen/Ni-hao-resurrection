import { IsNotEmpty } from "class-validator";

export class AuthUserDto {
  @IsNotEmpty()
  readonly login: string;
  @IsNotEmpty()
  readonly password: string;
}