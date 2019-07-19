import { BaseEntity, Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { CatalogCardGeneratorFactory } from '../../modules/cards/lib/catalog-card-generator.factory';
import { CardMaterialType } from '../../modules/cards/lib/card-material-type.enum';

@Entity('cards')
export class Card extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true })
  title: string;

  // TODO :: Should be enum object
  @Column({ nullable: true })
  cardtype: CardMaterialType;

  @Column({ nullable: true })
  callnum: string;

  @Column({ type: 'text', nullable: true })
  cardtext: string;

  @Column({ nullable: true })
  scribble1: string;

  @Column({ nullable: true })
  scribble2: string;

  @Column({ nullable: true })
  scribble3: string;

  @Column({ type: 'int', nullable: true })
  cardtemplate: number;

  @Column({ nullable: true })
  font1: string;

  @Column({ nullable: true })
  font2: string;

  @Column({ nullable: true })
  font3: string;

  createImage() {
    const imageFactory = new CatalogCardGeneratorFactory(this);
    imageFactory.createImage().then((filename) => {
      this.filename = filename;
    });
  }
  filename: string;

}
