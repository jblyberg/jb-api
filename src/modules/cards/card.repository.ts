import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Card } from '../../database/entities/card.entity';
import { v4 as uuid } from 'uuid';
import { CatalogCardImageStream } from './lib/CatalogCardImageStream';
import { PNGStream } from 'canvas';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  private logger = new Logger('CardRepository');

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { title, cardtype, callnum, cardtext, scribble1, scribble2, scribble3 } = createCardDto;

    const card = new Card();

    card.id = uuid();

    card.title = title ? title : null;
    card.cardtype = cardtype ? cardtype : null;
    card.callnum = callnum ? callnum : null;
    card.cardtext = cardtext ? cardtext : null;
    card.scribble1 = scribble1 ? scribble1 : null;
    card.scribble2 = scribble2 ? scribble2 : null;
    card.scribble3 = scribble3 ? scribble3 : null;

    try {
      await card.createProperties();
    } catch (error) {
      this.logger.error(`Failed to create card properties. Data: ${createCardDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    try {
      await card.save();
    } catch (error) {
      this.logger.error(`Failed to save card. Data: ${createCardDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return card;
  }

  async createCardStream(card: Card): Promise<PNGStream> {
    try {
      const cardStream = new CatalogCardImageStream(card);
      return await cardStream.createCardStream();
    } catch (error) {
      this.logger.error(`Failed to create card stream. Card: ${card}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
