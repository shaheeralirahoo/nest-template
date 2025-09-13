import { Injectable } from '@nestjs/common';
import { PostDTO } from 'src/dto/post.dto';
import { RepoService } from './repo.service';


@Injectable()
export class PostService {
  constructor(
    private readonly repo: RepoService
  ){}
  async create(body: PostDTO) {
    const post = await this.repo.PostEntity.save(body)
    // return post9+ 
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, body: PostDTO) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
