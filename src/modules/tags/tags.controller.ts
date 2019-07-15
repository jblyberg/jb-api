import { Controller, Logger, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from 'src/database/entities/tag.entity';

@Controller('tags')
export class TagsController {
  private logger = new Logger('PostsController');

  constructor(private tagsService: TagsService) {}

  @Get('/:name')
  async getTag(
    @Param('name') name: string,
    ): Promise<Tag> {
      const tag = await this.tagsService.getTagByName(name);
      const posts = await tag.posts;
      return posts.map(post => post.id);
      return posts;
      return this.tagsService.getTagByName(name);
    }

}
