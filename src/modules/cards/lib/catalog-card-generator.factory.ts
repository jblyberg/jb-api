import { Card } from '../../../database/entities/card.entity';
import { createCanvas, loadImage } from 'canvas';
import * as sizeOf from 'image-size';
import { createWriteStream } from 'fs';
import * as path from 'path';
import * as pify from 'pify';

export class CatalogCardGeneratorFactory {

  private card: Card;

  constructor(card: Card) {
    this.card = card;
  }

  async createImage() {
    console.log(this.card);

    const outputFilename = this.card.id + '.png';
    const imageSizeOfP = pify(sizeOf);
    const source = 'src/modules/cards/lib/cardstock/card1.png';
    const { width, height } = await imageSizeOfP(source);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw base image
    const image = await loadImage(source);
    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = '#000';
    ctx.rotate(0.1);
    ctx.fillText('English: Some text in Impact.', 10, 10);
    ctx.fillText('Japanese: 図書館の中では、静かにする。', 10, 30);
    ctx.fillText('Arabic: اللغة العربية هي أكثر اللغات تحدثا ضمن', 10, 50);
    ctx.fillText('Korean: 모타는사라미 못하는 사람이', 10, 70);

    canvas.createPNGStream().pipe(createWriteStream('src/modules/cards/output/' + outputFilename));

    return outputFilename;

  }
  
}
