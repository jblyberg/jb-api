import { Controller, Get, Post as Post_, Body, Param,
  Delete, Patch, Query, UsePipes, ValidationPipe,
  ParseIntPipe, UseGuards, Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatusValidationPipe } from './pipes/post-status-validation.pipe';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post } from '../../database/entities/post.entity';
import { PostStatus } from './post-status.enum';
import { User } from '../../database/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  private logger = new Logger('PostsController');

  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @GetUser() user: User,
  ): Promise<Post[]> {
    this.logger.verbose(`User "${user.email}" retrieving all posts. Filters: ${JSON.stringify(filterDto)}`);
    return this.postsService.getPosts(filterDto, user);
  }

  @Get('/:id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postsService.getPostById(id, user);
  }

  @Post_()
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Post> {
    this.logger.verbose(`User "${user.email}" creating a new post. Data: ${JSON.stringify(createPostDto)}`);
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postsService.deletePost(id, user);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) status: PostStatus,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postsService.updatePostStatus(id, status, user);
  }
}
