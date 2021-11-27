import { CanActivate, forwardRef, Inject, Injectable, ExecutionContext } from "@nestjs/common";
import { resolve } from "path/posix";
import { Observable } from "rxjs";
import { UsersRepository } from "src/users/users.repository";


@Injectable()
export class UserIsUserGuard implements CanActivate {

    constructor(
        @Inject(forwardRef(() => UsersRepository))
        private usersRepository: UsersRepository
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const paramsId = +request.params.id;
        const userFromRequest = request.user;
        const id = userFromRequest.id;
        let hasPermissions: boolean;
        if (paramsId === id) {
            hasPermissions = true;
        } else {
            hasPermissions = false
        }
        return hasPermissions;
    }
}