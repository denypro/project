/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/post/post.controller.ts
import {
  Controller,
  Post as HttpPost,
  Body,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma, Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  async create(
    @Body() data: Prisma.PostUncheckedCreateInput,
  ): Promise<PostModel> {
    if (!data.usuarioId || typeof data.usuarioId !== 'number') {
      throw new BadRequestException(
        'usuarioId é obrigatório e deve ser número.',
      );
    }

    return this.postService.createPost(data);
  }

  @Get()
  async getAll(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async getById(@Param('id') id: string): Promise<PostModel | null> {
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      throw new BadRequestException('ID inválido.');
    }

    return this.postService.getPostById(postId);
  }

  @Get('user/:usuarioId')
  async getByUsuario(
    @Param('usuarioId') usuarioId: string,
  ): Promise<PostModel[]> {
    const uid = parseInt(usuarioId, 10);
    if (isNaN(uid)) {
      throw new BadRequestException('ID do usuário inválido.');
    }

    return this.postService.getPostsByUser(uid);
  }
}
