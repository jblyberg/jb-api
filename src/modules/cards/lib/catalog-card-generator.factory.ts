import { Card } from '../../../database/entities/card.entity';
import { createCanvas, loadImage, registerFont } from 'canvas';
import * as sizeOf from 'image-size';
import { createWriteStream, readdirSync } from 'fs';
import * as pify from 'pify';
import { shuffle } from 'lodash';
import * as wrap from 'word-wrap';

export class CatalogCardGeneratorFactory {

  private card: Card;

  constructor(card: Card) {
    this.card = card;
  }

  async createImage() {

    // const outputFilename = this.card.id + '.png';
    const outputFilename = 'foo.png';

    // Randomly assign card
    const cardSource = this.assignCardSource();

    // Assign and register fonts
    await this.registerCardFonts();

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
    this.writeTitle(ctx)
    .writeCardType(ctx)
    .writeCardCallnum(ctx)
    .writeCardText(ctx)
    .writeScribble1(ctx)
    .writeScribble2(ctx)
    .writeScribble3(ctx);

    // ctx.rotate(0.05);
    // ctx.font = '12px ' + this.card.font1;
    // ctx.fillText('English: Some text in Font 1.', 10, 10);

    // ctx.font = '12px ' + this.card.font2;
    // ctx.fillText('English: Some text in Font 2.', 10, 30);

    // ctx.font = '12px ' + this.card.font3;
    // ctx.fillText('English: Some text in Font 3.', 10, 50);

    canvas.createPNGStream().pipe(createWriteStream('src/modules/cards/output/' + outputFilename));

    return outputFilename;

  }

  private writeTitle(ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '8pt freemonobold';
    ctx.fillText(this.card.title, 93, 30);
    return this;
  }

  private writeCardType(ctx) {
    ctx.fillStyle = '#CA3433';
    ctx.font = '8pt freesansbold';
    ctx.rotate(0.05);
    ctx.fillText(this.card.cardtype, 10, 20);
    ctx.rotate(-0.05);
    return this;
  }

  private writeCardCallnum(ctx) {
    ctx.fillStyle = '#CA3433';
    ctx.font = '10pt freemonobold';
    ctx.fillText(this.card.callnum, 10, 60);
    return this;
  }

  private writeCardText(ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '8pt freemonobold';
    ctx.fillText(wrap(this.card.cardtext, {width: 38, indent: ''}), 93, 50);
    return this;
  }

  private writeScribble1(ctx) {
    ctx.font = '12px ' + this.card.font1;
    ctx.fillText(this.card.scribble1, 10, 10);
    return this;
  }

  private writeScribble2(ctx) {
    ctx.font = '12px ' + this.card.font2;
    ctx.fillText(this.card.scribble2, 10, 10);
    return this;
  }

  private writeScribble3(ctx) {
    ctx.font = '12px ' + this.card.font3;
    ctx.fillText(this.card.scribble3, 10, 10);
    return this;
  }

  private assignCardSource() {

    const cardStockFolder = 'src/modules/cards/lib/cardstock/card';

    if (this.card.cardtemplate) {
      return cardStockFolder + this.card.cardtemplate + '.png';
    }

    const cardNumber = Math.floor(Math.random() * 4) + 1;
    const cardSource = cardStockFolder + cardNumber + '.png';
    this.card.cardtemplate = cardNumber;

    return cardSource;
  }

  private async registerCardFonts() {

    const cardBaseFontFolder = 'src/modules/cards/lib/fonts/base/';
    const cardHandFontFolder = 'src/modules/cards/lib/fonts/hand/';

    // Register base fonts
    registerFont(cardBaseFontFolder + 'freesansbold.ttf', { family: 'freesansbold' });
    registerFont(cardBaseFontFolder + 'freemonobold.ttf', { family: 'freemonobold' });

    // Grab hand fonts from directory
    const handFonts = shuffle(readdirSync(cardHandFontFolder)).slice(0, 3);

    // Assign to card
    this.card.font1 = handFonts[0].slice(0, -4);
    this.card.font2 = handFonts[1].slice(0, -4);
    this.card.font3 = handFonts[2].slice(0, -4);

    // Register hand fonts
    registerFont(cardHandFontFolder + this.card.font1 + '.ttf', { family: this.card.font1 });
    registerFont(cardHandFontFolder + this.card.font2 + '.ttf', { family: this.card.font2 });
    registerFont(cardHandFontFolder + this.card.font3 + '.ttf', { family: this.card.font3 });

  }

}
