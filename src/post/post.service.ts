/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { usuario: true },
    });
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      //   include: { usuario: true },
      include: { usuario: { select: { nome: true, email: true } } },
    });
  }

  async getPostsByUser(usuarioId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { usuarioId },
    });
  }
}
