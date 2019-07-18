import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { Card } from '../../database/entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepository,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardRepository.createCard(createCardDto);
  }

}
