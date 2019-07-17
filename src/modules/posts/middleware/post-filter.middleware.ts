import { Injectable, NestMiddleware, Next } from '@nestjs/common';
import { Tag } from '../../../database/entities/tag.entity';
import { TagsService } from '../../tags/tags.service';

@Injectable()
export class PostFilterMiddleware implements NestMiddleware {

  constructor(
    private readonly tagsService: TagsService,
  ) {}

  public use(req: any, res: any, next: any) {
    if (req.query.tags) {
      const tagPromise = this.mapTags(req.query.tags);

      tagPromise.then((tags) => {
        req.query.tags = tags;
        next();
      });

    } else {
      next();
    }
  }

  private async mapTags(pipedTags: string): Promise<Tag[]> {

    const filterTags = pipedTags.split('|');
    const tags: Tag[] = [];

    for (const tag of filterTags) {
      try {
        const tagObj = await this.tagsService.getTagByName(tag);
        if (tagObj) {
          tags.push(tagObj);
        }
      } catch (error) {
          // Ignore tags that don't exist
      }
    }

    if (tags.length === 0) { return null; }

    return tags;
  }

}
