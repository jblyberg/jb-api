import { BaseEntity, Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { CatalogCardGeneratorFactory } from '../../modules/cards/lib/catalog-card-generator.factory';

@Entity('cards')
export class Card extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createDate: Date;

  @Column()
  title: string;

  // TODO :: Should be enum object
  @Column()
  materialtype: string;

  @Column()
  callnum: string;

  @Column({ type: 'text' })
  cardtext: string;

  @Column()
  scribble1: string;

  @Column()
  scribble2: string;

  @Column()
  scribble3: string;

  @Column()
  card: number;

  @Column()
  font1: string;

  @Column()
  font2: string;

  @Column()
  font3: string;

  createImage() {
    const imageFactory = new CatalogCardGeneratorFactory(this);
    imageFactory.createImage().then((filename) => {
      this.filename = filename;
    });
  }
  filename: string;

}
