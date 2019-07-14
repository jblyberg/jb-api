import { PostStatus } from '../post-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { User } from '../../auth/user.entity';

export class GetPostsFilterDto {
  @IsOptional()
  @IsIn([PostStatus.DRAFT, PostStatus.UNPUBLISHED, PostStatus.PUBLISHED])
  status: PostStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  user: User;

}
