import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { Card } from '../../database/entities/card.entity';
import { PNGStream } from 'canvas';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepository
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardRepository.createCard(createCardDto);
  }

  async getCardById(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }

    return card;
  }

  async createCardStream(id: string): Promise<PNGStream> {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    return this.cardRepository.createCardStream(card);
  }
}
