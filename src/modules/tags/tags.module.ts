import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagRepository } from './tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
