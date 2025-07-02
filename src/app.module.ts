import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, PostModule],
})
export class AppModule {}
