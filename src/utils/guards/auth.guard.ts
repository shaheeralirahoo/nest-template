import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LoggedDeviceEntity } from 'src/entitties/loggedDevice.entity';
import { UserEntity } from 'src/entitties/User.entity';
import { RepoService } from 'src/services/repo.service';

import { Repository } from 'typeorm';
import { ENV } from '../setupEnviorment';

export class AuthGuard implements CanActivate {
    constructor(
        @Inject(RepoService) public repo: RepoService,
        private jwtService: JwtService,
        private reflector: Reflector // Inject Reflector to access route metadata
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler()); // Check if 'isPublic' metadata exists
        console.log("isPublic =>", isPublic)
        if (isPublic) {
            // console.log("isPublic auth =>", isPublic)
            return true;
        }

        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException("Invalid Token Login again");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException("Invalid Token Login again");;
        }
        console.log("token =>", token)
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: ENV.JwtSecret
                }
            );
            if (!payload) {
                throw new UnauthorizedException("Invalid Token Login again");
            }

            console.log("payload =>", payload)

            const loggedDevice = await this.repo.LoggedDeviceEntity.findOne({ where: { id: payload.sub } })
            if (!loggedDevice) {
                throw new UnauthorizedException("Invalid Token Login again");
            }
            const user = await this.repo.UserEntity.findOne({ where: { id: loggedDevice.userRecord } });
            if (!user) {
                throw new UnauthorizedException("Invalid Token Login again");
            }
            request['user'] = user;
            request['session'] = loggedDevice;
        } catch {
            throw new UnauthorizedException("Invalid Token Login again");
        }
        return true;
    }
}