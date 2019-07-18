import { Logger, InternalServerErrorException, Injectable, Module } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Card } from '../../database/entities/card.entity';
import { v4 as uuid } from 'uuid';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  private logger = new Logger('CardRepository');

  async createCard(createCardDto: CreateCardDto): Promise<Card> {

    const { title } = createCardDto;

    const card = new Card();

    card.id = uuid();
    card.title = title;

    card.createImage();

    try {
      await card.save();
    } catch (error) {
      this.logger.error(`Failed to create card. Data: ${createCardDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return card;
  }

}
