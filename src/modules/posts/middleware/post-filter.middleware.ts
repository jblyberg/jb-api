import { Injectable, NestMiddleware } from '@nestjs/common';
import { Tag } from '../../../database/entities/tag.entity';

@Injectable()
export class PostFilterMiddleware implements NestMiddleware {

  // Split piped URL parameter into separate tags and build them out
  public use(req: any, res: any, next: any) {
    if (req.query.tags) {
      const tags = req.query.tags.split('|');
      req.query.tags = tags.map((tag: string) => {
        const tagObj = new Tag();
        tagObj.name = tag;
        return tagObj;
      });
    }
    next();
  }
}
