import { Card } from '../../../database/entities/card.entity';
import { createCanvas, loadImage, registerFont, PNGStream } from 'canvas';
import { Logger } from '@nestjs/common';
import * as sizeOf from 'image-size';
import * as pify from 'pify';
import * as wrap from 'word-wrap';

/**
 * Generates a catalog card image from a card entity
 */
export class CatalogCardImageStream {

  private card: Card;
  private cardLibDirectory: string;
  private pngStream: PNGStream;
  private logger = new Logger('CatalogCardImageStream');

  constructor(card: Card) {
    this.card = card;
    this.cardLibDirectory = 'src/modules/cards/lib';
  }

  async createCardStream(): Promise<PNGStream> {
    // Assign and register fonts
    await this.registerCardFonts();

    const cardStockFolder = this.cardLibDirectory + '/cardstock/card';
    const cardSource = cardStockFolder + this.card.cardtemplate + '.png';

    // Create the card canvas and context
    const imageSizeOfP = pify(sizeOf);
    const { width, height } = await imageSizeOfP(cardSource);

    // Create the image canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw carstock image onto context
    const image = await loadImage(cardSource);
    ctx.drawImage(image, 0, 0);

    // Add card content

    await this.writeTitle(ctx);
    await this.writeCardType(ctx);
    await this.writeCardCallnum(ctx);
    await this.writeCardText(ctx);
    await this.writeScribble1(ctx);
    await this.writeScribble2(ctx);
    await this.writeScribble3(ctx);

    // Create the image stream
    this.pngStream = canvas.createPNGStream({
      compressionLevel: 6,
      filters: canvas.PNG_ALL_FILTERS,
      palette: undefined,
      backgroundIndex: 0,
      resolution: 96,
    });

    return this.pngStream;
  }

  private writeTitle(ctx) {
    if (this.card.title) {
      ctx.fillStyle = '#000';
      ctx.font = '11px freemonobold';
      ctx.fillText(this.card.title, 93, 30);
    }
    return this;
  }

  private writeCardType(ctx) {
    if (this.card.cardtype) {
      const randomAngleFloat = (Math.random() * (0.1 - 0.01) + 0.01) - .05;
      ctx.fillStyle = '#CA3433';
      ctx.font = '8pt freesansbold';
      ctx.rotate(randomAngleFloat);
      ctx.fillText(this.card.cardtype, 10, 20);
      ctx.rotate(randomAngleFloat * -1);
    }
    return this;
  }

  private writeCardCallnum(ctx) {
    if (this.card.callnum) {
      ctx.fillStyle = '#CA3433';
      ctx.font = '10pt freemonobold';
      ctx.fillText(this.card.callnum, 10, 60);
    }
    return this;
  }

  private writeCardText(ctx) {
    if (this.card.cardtext) {
      ctx.fillStyle = '#000';
      ctx.font = '11px freemonobold';
      ctx.fillText(wrap(this.card.cardtext, {width: 38, indent: ''}), 93, 50);
    }
    return this;
  }

  private writeScribble1(ctx) {
    if (this.card.scribble1) {
      ctx.font = '15px ' + this.card.font1;
      ctx.rotate(-0.3);
      ctx.fillText(this.card.scribble1, -38, 170);
      ctx.rotate(0.3);
    }
    return this;
  }

  private writeScribble2(ctx) {
    if (this.card.scribble2) {
      ctx.font = '12px ' + this.card.font2;
      ctx.fillText(this.card.scribble2, 85, 20);
    }
    return this;
  }

  private writeScribble3(ctx) {
    if (this.card.scribble3) {
      ctx.font = '12px ' + this.card.font3;
      ctx.rotate(0.025);
      ctx.fillText(this.card.scribble3, 203, 185);
      ctx.rotate(-0.025);
    }
    return this;
  }

  /**
   * Registers base fonts.
   * Checks to see if fonts have been assigned to scribbles.
   * If not, fonts are assigned to scribbles.
   */
  private async registerCardFonts() {

    const cardBaseFontFolder = this.cardLibDirectory + '/fonts/base/';
    const cardHandFontFolder = this.cardLibDirectory + '/fonts/hand/';

    // Register base fonts
    registerFont(cardBaseFontFolder + 'freesansbold.ttf', { family: 'freesansbold' });
    registerFont(cardBaseFontFolder + 'freemonobold.ttf', { family: 'freemonobold' });

    // Register hand fonts
    registerFont(cardHandFontFolder + this.card.font1 + '.ttf', { family: this.card.font1 });
    registerFont(cardHandFontFolder + this.card.font2 + '.ttf', { family: this.card.font2 });
    registerFont(cardHandFontFolder + this.card.font3 + '.ttf', { family: this.card.font3 });

  }

}
