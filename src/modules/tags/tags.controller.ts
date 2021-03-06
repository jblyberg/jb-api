import { Controller, Logger, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagsController {
  private logger = new Logger('TagsController');

  constructor(private tagsService: TagsService) {}

  @Delete('/:name')
  @UseGuards(AuthGuard())
  deleteTag(@Param('name') name: string): Promise<void> {
    return this.tagsService.deleteTag(name);
  }
}
