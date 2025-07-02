import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async usuario(
    usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
    });
  }
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany(); // Busca todos os usuários
  }
  //   async createUser(data: { nome: string; email: string }) {
  async createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    if (!data.password) {
      throw new Error('O campo "password" é obrigatório.');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.usuario.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { where, data } = params;

    // Se existir campo password e for string, faz hash antes de atualizar
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.usuario.update({
      where,
      data,
    });
  }

  async deleteUser(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
