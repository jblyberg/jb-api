import { Controller, Post, Logger, Body, Get, HttpCode, Header, HttpStatus, Res, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from '../../database/entities/card.entity';
import { CardMaterialTypeValidationPipe } from './pipes/card-material-validation.pipe';
// tslint:disable-next-line: no-implicit-dependencies
import { Response } from 'express';
import { createReadStream } from 'fs';

@Controller('cards')
export class CardsController {
  private logger = new Logger('CardsController');

  constructor(private cardsService: CardsService) {}

  @Post('/create')
  createCard(
    @Body(CardMaterialTypeValidationPipe) createCardDto: CreateCardDto,
  ): Promise<Card> {
    this.logger.verbose(`Creating a new card. Data: ${JSON.stringify(createCardDto)}`);
    return this.cardsService.createCard(createCardDto);
  }

  @Get('card/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/png')
  async streamCard(
    @Param('id') id: string,
    @Res() response: Response,
  ) {

    response.setHeader(
      'Content-Disposition',
      'attachment; filename=card-' + id + '.png',
    );

    const cardStream = await this.cardsService.createCardStream(id);

    cardStream.pipe(response);

  }

}
