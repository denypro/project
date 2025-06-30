import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! eu sou o denilson e estou a começar a desenvolver em nest.js';
  }
}
