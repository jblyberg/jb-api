import { Comment } from '../../database/entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private logger = new Logger('CommentRepository');

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    // const { name, stuff, etc } = createCommentDto;

    // Comment stuff
    const comment = new Comment();

    try {
      await comment.save();
    } catch (error) {
      this.logger.error(`Failed to create comment. Data: ${createCommentDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return comment;
  }
}
