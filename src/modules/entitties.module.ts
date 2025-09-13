import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "src/entitties/entities";
import { LoggedDeviceEntity } from "src/entitties/loggedDevice.entity";
import { UserEntity } from "src/entitties/User.entity";
import { RepoService } from "src/services/repo.service";

@Module({
    imports:[TypeOrmModule.forFeature([...entities])],
    providers: [RepoService],
    exports: [RepoService,TypeOrmModule]
})
export class EntityModule {}