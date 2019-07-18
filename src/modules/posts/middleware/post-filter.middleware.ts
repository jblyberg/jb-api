import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Tag } from '../../../database/entities/tag.entity';
import { TagsService } from '../../tags/tags.service';

@Injectable()
export class PostFilterMiddleware implements NestMiddleware {

  private logger = new Logger('PostFilterMiddleware');

  constructor(
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Use function required by NestJS middleware. Handles the pipeline logic.
   *
   * @param req : any
   * @param res : any
   * @param next : any
   */
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

  /**
   * Takes tags separated by pipes from the request URL and maps them to actual Tag entities.
   * It will quietly throw out and tags that are not in the database.
   *
   * @param pipedTags : string
   */
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
        if (error.status === 404) {
          this.logger.debug(`Tag "${tag}" not found. Err: ${error.status}`);
        } else {
          this.logger.error(`Could not retrieve tag "${tag}". Err: ${error.status}`);
        }
      }
    }

    if (tags.length === 0) { return null; }

    return tags;
  }

}
