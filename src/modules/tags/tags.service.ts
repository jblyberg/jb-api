import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './tag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../database/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async getTagById(id: number): Promise<Tag> {
    const found = await this.tagRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return found;
  }

  async getTagByName(name: string): Promise<Tag> {
    const found = await this.tagRepository.findOne({ where: { name } });

    if (!found) {
      throw new NotFoundException(`Tag with name "${name}" not found`);
    }
    return found;
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagRepository.createTag(createTagDto);
  }

  async createTags(postTags: CreateTagDto[]): Promise<Tag[]> {
    const tags = [];

    for (const tag of postTags) {
      tags.push(await this.createTag(tag));
    }

    return tags;
  }

  async deleteTag(name: string): Promise<void> {
    const result = await this.tagRepository.delete({ name });

    if (result.affected === 0) {
      throw new NotFoundException(`Tag with name "${name}" not found`);
    }
  }

}
