import { Controller, Post, Logger, Body, Get, Header, Res, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from '../../database/entities/card.entity';
import { CardMaterialTypeValidationPipe } from './pipes/card-material-validation.pipe';
// tslint:disable-next-line: no-implicit-dependencies
import { Response } from 'express';

@Controller('cards')
export class CardsController {
  private logger = new Logger('CardsController');

  constructor(private cardsService: CardsService) {}

  @Post('/create')
  createCard(@Body(CardMaterialTypeValidationPipe) createCardDto: CreateCardDto): Promise<Card> {
    this.logger.verbose(`Creating a new card. Data: ${JSON.stringify(createCardDto)}`);
    return this.cardsService.createCard(createCardDto);
  }

  @Get('/:id')
  getCardById(@Param('id') id: number): Promise<Card> {
    return this.cardsService.getCardById(id);
  }

  @Get('card/:id')
  @Header('Content-Type', 'image/png')
  async streamCard(@Param('id') id: string, @Res() response: Response) {
    const cardStream = await this.cardsService.createCardStream(id);

    response.setHeader('Content-Disposition', 'attachment; filename=card-' + id + '.png');

    cardStream.pipe(response);
  }
}
