import { Post } from '../../database/entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './post-status.enum';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { User } from '../../database/entities/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { TagsService } from '../tags/tags.service';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  
  private tagService: TagsService;

  private logger = new Logger('PostRepository');

  async getPosts(
    filterDto: GetPostsFilterDto,
    user?: User,
  ): Promise<Post[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('posts');

    query.where('1');

    if (status) {
      query.andWhere('posts.status = :status', { status });
    }

    if (search) {
      query.andWhere('(posts.title LIKE :search OR posts.description LIKE :search)', { search: `%${search}%` });
    }

    if (user) {
      query.andWhere('posts.userId = :userId', { userId: user.id });
    }

    try {
      const posts = await query.getMany();
      return posts;
    } catch (error) {
      this.logger.error(`Failed to get posts for user "${user.email}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const { title, body, tags } = createPostDto;

    const post = new Post();
    post.title = title;
    post.body = body;
    post.status = PostStatus.DRAFT;
    post.user = user;
    post.tags = this.tagService.createTags(tags);

    try {
      await post.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.email}". Data: ${createPostDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete post.user;
    return post;
  }
}