import { BaseEntity, Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { CatalogCardProperties } from '../../modules/cards/lib/CatalogCardProperties';
import { CardMaterialType } from '../../modules/cards/card-material-type.enum';

@Entity('cards')
export class Card extends BaseEntity {

  private cardUrl: string;

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

  createProperties() {
    const cardProperties = new CatalogCardProperties(this);
    cardProperties.createProperties().then((completed) => {
      this.generated = completed;
    });
  }
  generated: boolean;

}
