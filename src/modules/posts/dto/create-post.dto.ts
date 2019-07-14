import { IsNotEmpty, IsOptional } from 'class-validator';
import { Tag } from '../../../database/entities/tag.entity';

export class CreatePostDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  tags: Tag[];

}
