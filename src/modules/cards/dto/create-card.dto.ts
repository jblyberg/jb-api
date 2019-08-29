import { CardMaterialType } from '../card-material-type.enum';

export class CreateCardDto {
  title: string;

  cardtype: CardMaterialType;

  callnum: string;

  cardtext: string;

  scribble1: string;

  scribble2: string;

  scribble3: string;
}
