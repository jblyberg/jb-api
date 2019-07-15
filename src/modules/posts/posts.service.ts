import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { PostStatus } from './post-status.enum';
import { User } from '../../database/entities/user.entity';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private readonly tagService: TagsService,
  ) {}

  async getPosts(
    filterDto: GetPostsFilterDto,
    user: User,
  ): Promise<Post[]> {
    return this.postRepository.getPosts(filterDto, user);
  }

  async getPostById(
    id: number,
    user: User,
  ): Promise<Post> {
    const found = await this.postRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return found;
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    return this.postRepository.createPost(createPostDto, user, this.tagService);
  }

  async deletePost(
    id: number,
    user: User,
  ): Promise<void> {
    const result = await this.postRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }

  async updatePostStatus(
    id: number,
    status: PostStatus,
    user: User,
  ): Promise<Post> {
    const post = await this.getPostById(id, user);
    post.status = status;
    await post.save();
    return post;
  }
}
