import { Tag } from '../../database/entities/tag.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto'

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private logger = new Logger('PostRepository');

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {

    const { name } = createTagDto;

    // Check if tag exists, if so, return existing tag
    const found = await this.findOne({ where: { name } });

    if (found) {
      return found;
    }

    // If doesn't exist, create tag and return it
    const tag = new Tag();
    tag.name = name;

    try {
      await tag.save();
    } catch (error) {
      this.logger.error(`Failed to create tag "${tag.name}". Data: ${createTagDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return tag;
  }

}
