import { Controller, Logger, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagsController {
  private logger = new Logger('PostsController');

  constructor(private tagsService: TagsService) {}

  @Delete('/:name')
  @UseGuards(AuthGuard())
    deletePost(
      @Param('name') name: string,
    ): Promise<void> {
      return this.tagsService.deleteTag(name);
    }
}
