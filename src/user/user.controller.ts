import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Usuario as UserModel } from '@prisma/client';

// import { PrismaService } from 'src/database/prisma.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.findAll();
  }
  @Post()
  async signupUser(
    @Body() userData: Prisma.UsuarioCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido. Deve ser um número.');
    }

    return this.userService.usuario({ id: userId });
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UsuarioUpdateInput,
  ): Promise<UserModel> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido.');
    }

    return this.userService.updateUser({
      where: { id: userId },
      data,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido.');
    }

    return this.userService.deleteUser(userId);
  }
}
