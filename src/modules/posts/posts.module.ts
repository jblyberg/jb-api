import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { AuthModule } from '../auth/auth.module';
import { TagsModule } from '../tags/tags.module';
import { PostFilterMiddleware } from './middleware/post-filter.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), AuthModule, TagsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostFilterMiddleware).forRoutes({ path: '/posts', method: RequestMethod.GET });
  }
}
