import { Date } from "mongoose";

export class createUserDto {
 
  readonly login: string;
  readonly email: string;
  readonly password: string;
  readonly date: string;
}