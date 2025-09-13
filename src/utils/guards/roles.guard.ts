
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorators';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler()); // Check if 'isPublic' metadata exists
        if (isPublic) {
            return true;
        }
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request: Request = context.switchToHttp().getRequest();

        const user = request['user']
        // console.log("user =>",user)
        if (!roles.includes(user.role)) {
            throw new ForbiddenException("user not allowed to  perform  this function")
        }
        return true
        // return matchRoles(roles, user.roles);
    }
}
