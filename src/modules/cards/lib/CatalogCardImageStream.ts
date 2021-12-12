import { Card } from '../../../database/entities/card.entity';
import { createCanvas, loadImage, registerFont, PNGStream, NodeCanvasRenderingContext2D } from 'canvas';
import { Logger } from '@nestjs/common';
import * as sizeOf from 'image-size';
import * as pify from 'pify';
import * as wrap from 'word-wrap';
import { join } from 'node:path';

/**
 * Generates a catalog card image from a card entity
 */
export class CatalogCardImageStream {
  private card: Card;
  private assetsDir: string;
  private pngStream: PNGStream;
  private logger = new Logger('CatalogCardImageStream');

  constructor(card: Card) {
    this.card = card;
    this.assetsDir = join(__dirname, '..', 'assets');
  }

  async createCardStream(): Promise<PNGStream> {
    // Assign and register fonts
    await this.registerCardFonts();

    const cardStockFolder = this.assetsDir + '/cardstock/card';
    const cardSource = cardStockFolder + this.card.cardtemplate + '.png';

    // Create the card canvas and context
    const imageSizeOfP = pify(sizeOf);
    const { width, height } = await imageSizeOfP(cardSource);

    // Create the image canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Draw carstock image onto context
    const image = await loadImage(cardSource);
    context.drawImage(image, 0, 0);

    // Add card content

    this.writeTitle(context);
    this.writeCardType(context);
    this.writeCardCallnum(context);
    this.writeCardText(context);
    this.writeScribble1(context);
    this.writeScribble2(context);
    this.writeScribble3(context);

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

  private writeTitle(context: NodeCanvasRenderingContext2D) {
    if (this.card.title) {
      context.fillStyle = '#000';
      context.font = '11px freemonobold';
      context.fillText(this.card.title, 93, 30);
    }
    return this;
  }

  private writeCardType(context: NodeCanvasRenderingContext2D) {
    if (this.card.cardtype) {
      const randomAngleFloat = Math.random() * (0.1 - 0.01) + 0.01 - 0.05;
      context.fillStyle = '#CA3433';
      context.font = '8pt freesansbold';
      context.rotate(randomAngleFloat);
      context.fillText(this.card.cardtype, 10, 20);
      context.rotate(randomAngleFloat * -1);
    }
    return this;
  }

  private writeCardCallnum(context: NodeCanvasRenderingContext2D) {
    if (this.card.callnum) {
      context.fillStyle = '#CA3433';
      context.font = '10pt freemonobold';
      context.fillText(this.card.callnum, 10, 60);
    }
    return this;
  }

  private writeCardText(context: NodeCanvasRenderingContext2D) {
    if (this.card.cardtext) {
      context.fillStyle = '#000';
      context.font = '11px freemonobold';
      context.fillText(wrap(this.card.cardtext, { width: 38, indent: '' }), 93, 50);
    }
    return this;
  }

  private writeScribble1(context: NodeCanvasRenderingContext2D) {
    if (this.card.scribble1) {
      context.font = '15px ' + this.card.font1;
      context.rotate(-0.3);
      context.fillText(this.card.scribble1, -38, 170);
      context.rotate(0.3);
    }
    return this;
  }

  private writeScribble2(context: NodeCanvasRenderingContext2D) {
    if (this.card.scribble2) {
      context.font = '12px ' + this.card.font2;
      context.fillText(this.card.scribble2, 85, 20);
    }
    return this;
  }

  private writeScribble3(context: NodeCanvasRenderingContext2D) {
    if (this.card.scribble3) {
      context.font = '12px ' + this.card.font3;
      context.rotate(0.025);
      context.fillText(this.card.scribble3, 203, 185);
      context.rotate(-0.025);
    }
    return this;
  }

  /**
   * Registers base fonts.
   * Checks to see if fonts have been assigned to scribbles.
   * If not, fonts are assigned to scribbles.
   */
  private async registerCardFonts() {
    const cardBaseFontFolder = join(this.assetsDir, '/fonts/base/');
    const cardHandFontFolder = join(this.assetsDir, '/fonts/hand/');

    // Register base fonts
    registerFont(cardBaseFontFolder + 'freesansbold.ttf', { family: 'freesansbold' });
    registerFont(cardBaseFontFolder + 'freemonobold.ttf', { family: 'freemonobold' });

    // Register hand fonts
    registerFont(cardHandFontFolder + this.card.font1 + '.ttf', { family: this.card.font1 });
    registerFont(cardHandFontFolder + this.card.font2 + '.ttf', { family: this.card.font2 });
    registerFont(cardHandFontFolder + this.card.font3 + '.ttf', { family: this.card.font3 });
  }
}
