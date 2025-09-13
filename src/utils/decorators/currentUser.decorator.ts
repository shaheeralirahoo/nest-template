import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoggedDeviceEntity } from 'src/entitties/loggedDevice.entity';
import { UserEntity } from 'src/entitties/User.entity';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user : UserEntity;
    },
);


export const GetSession = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const session = request.session;
        return data ? session : LoggedDeviceEntity;
    },
);
