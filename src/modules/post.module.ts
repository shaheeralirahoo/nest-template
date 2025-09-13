import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { PostService } from 'src/services/post.service';

import { EntityModule } from './entitties.module';
import { RepoService } from 'src/services/repo.service';


@Module({
  imports:[EntityModule],
  controllers: [PostController],
  providers: [PostService,RepoService],
})
export class PostModule {}
