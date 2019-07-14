import { PipeTransform, BadRequestException } from '@nestjs/common';
import { PostStatus } from '../post-status.enum';

export class PostStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    PostStatus.DRAFT,
    PostStatus.UNPUBLISHED,
    PostStatus.PUBLISHED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
