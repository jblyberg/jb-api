import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { AuthModule } from '../auth/auth.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    AuthModule,
    TagsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
