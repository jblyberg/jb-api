import { PipeTransform, BadRequestException } from '@nestjs/common';
import { CardMaterialType } from '../card-material-type.enum';
import { CreateCardDto } from '../dto/create-card.dto';

export class CardMaterialTypeValidationPipe implements PipeTransform {
  readonly allowedMaterialTypes = [CardMaterialType.PRINTED, CardMaterialType.AUDIO, CardMaterialType.VIDEO];

  /**
   * Checks the card material enum and transforms to uppercase
   *
   * @param value : string
   */
  transform(createCardDto: CreateCardDto) {
    if (createCardDto.cardtype) {
      if (!this.isMaterialValid(createCardDto.cardtype)) {
        throw new BadRequestException(`"${createCardDto.cardtype}" is an invalid material type`);
      }
    }

    return createCardDto;
  }

  private isMaterialValid(type: any) {
    const idx = this.allowedMaterialTypes.indexOf(type);
    return idx !== -1;
  }
}
