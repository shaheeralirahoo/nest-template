import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggedDeviceEntity } from "src/entitties/loggedDevice.entity";
import { PostEntity } from "src/entitties/post.entity";
import { UserEntity } from "src/entitties/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class RepoService {
    constructor(
        @InjectRepository(LoggedDeviceEntity) public  LoggedDeviceEntity: Repository<LoggedDeviceEntity>,
        @InjectRepository(UserEntity) public  UserEntity: Repository<UserEntity>,
        @InjectRepository(PostEntity) public  PostEntity: Repository<PostEntity>,
    ) { }
}