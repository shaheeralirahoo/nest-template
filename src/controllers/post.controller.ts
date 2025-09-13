import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { PostDTO } from 'src/dto/post.dto';
import { UserEntity } from 'src/entitties/User.entity';
import { PostService } from 'src/services/post.service';
import { GetUser } from 'src/utils/decorators/currentUser.decorator';
import { multerOptions } from 'src/utils/multer';



@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseInterceptors(FileInterceptor("file", { ...multerOptions, limits: { files: 1, fileSize: 50 * 1024 * 1024 } }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: UserEntity,
    @Body() body: PostDTO
  ) {
    body.image = file.path;
    body.createdby = user.id
    return this.postService.create(body);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: PostDTO) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
