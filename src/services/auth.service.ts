import { Injectable } from '@nestjs/common';
import { RepoService } from './repo.service';
import { JwtService } from '@nestjs/jwt';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { LogInDTO, SignUpDTO } from 'src/dto/auth.dto';
import { comparePassword, hashPassword } from 'src/utils/helper';
import { throwBadRequestException } from 'src/utils/error';
import { UserEntity } from 'src/entitties/User.entity';
import { ENV } from 'src/utils/setupEnviorment';

@Injectable()
export class AuthService {
    constructor(
        private readonly repo: RepoService,
        private readonly jwtService: JwtService
    ) { }


    async signUp(body: SignUpDTO) {
        // console.log("infunction")
        const userExists = await this.repo.UserEntity.findOne({ where: { email: body.email } });
        // console.log("userExists =>",userExists)
        throwBadRequestException(userExists, "User already exists")
        body.password = await hashPassword(body.password);
        const createdUser = await this.repo.UserEntity.create(body);
        await this.repo.UserEntity.save(createdUser)
        return createdUser;
    }


    async login(body: LogInDTO) {

        const user = await this.repo.UserEntity.findOne({ where: { email: body.email } });
        // console.log("user =>",user)
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }


        const isPasswordValid = await comparePassword(body.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException("Invalid credentials");
        }


        const token = await this.updateLoggedDevice(user, body)

        return { user, token };
    }


    async updateLoggedDevice(user: UserEntity, body: LogInDTO) {
        const loggedDevicesExist = await this.repo.LoggedDeviceEntity.find({ where: { deviceIdentity: body.deviceIdentity } });

        if (loggedDevicesExist.length > 0) {
            await this.repo.LoggedDeviceEntity.remove(loggedDevicesExist);
        }

        const createLoggedDevice = await this.repo.LoggedDeviceEntity.save({ ...body, userRecord: user.id });
        const payload = { sub: createLoggedDevice.id };
        const token = await this.jwtService.signAsync(payload, { expiresIn: ENV.JwtExpire, secret: ENV.JwtSecret });

        createLoggedDevice.authToken = token;
        await this.repo.LoggedDeviceEntity.save(createLoggedDevice);

        return token;
    }


}
