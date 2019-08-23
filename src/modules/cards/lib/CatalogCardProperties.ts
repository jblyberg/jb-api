import { Card } from '../../../database/entities/card.entity';
import { readdirSync } from 'fs';
import { shuffle } from 'lodash';

export class CatalogCardProperties {
  private card: Card;
  private cardLibDirectory: string;

  constructor(card: Card) {
    this.card = card;
    this.cardLibDirectory = 'src/modules/cards/lib';
  }

  /**
   * Builds out a new Card.
   */
  async createProperties(): Promise<boolean> {
    let assigned: boolean = false;

    // Assign fandom card and fonts
    await this.assignCardSource();
    await this.assignCardFonts();
    assigned = true;

    return assigned;
  }

  /**
   * Checks to see if the cardtemplate exists in the entity.
   * If not, randomly chooses one and assigns it to the entity
   */
  private async assignCardSource() {
    const cardNumber = Math.floor(Math.random() * 4) + 1;
    this.card.cardtemplate = cardNumber;

    return this;
  }

  /**
   * Registers base fonts.
   * Checks to see if fonts have been assigned to scribbles.
   * If not, fonts are assigned to scribbles.
   */
  private async assignCardFonts() {
    const cardHandFontFolder = this.cardLibDirectory + '/fonts/hand/';

    // Grab hand fonts from directory and randomize
    const handFonts = await shuffle(readdirSync(cardHandFontFolder)).slice(0, 3);

    // Assign fonts
    this.card.font1 = handFonts[0].slice(0, -4);
    this.card.font2 = handFonts[1].slice(0, -4);
    this.card.font3 = handFonts[2].slice(0, -4);

    return this;
  }
}
