import { IsNotEmpty } from 'class-validator';
import { Tag } from '../../tags/tag.entity';

export class CreatePostDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  tags: Tag[];

}
