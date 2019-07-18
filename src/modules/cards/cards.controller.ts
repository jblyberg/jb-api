import { Controller, Post, Logger, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from '../../database/entities/card.entity';

@Controller('cards')
export class CardsController {
  private logger = new Logger('CardsController');

  constructor(private cardsService: CardsService) {}

  @Post('/create')
  createCard(
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    this.logger.verbose(`Creating a new card. Data: ${JSON.stringify(createCardDto)}`);
    return this.cardsService.createCard(createCardDto);
  }
}
