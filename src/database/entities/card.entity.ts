import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogCardGeneratorFactory } from '../../modules/cards/lib/catalog-card-generator.factory';

@Entity('cards')
export class Card extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  createImage() {
    const imageFactory = new CatalogCardGeneratorFactory(this);
    return imageFactory.createImage();
  }

}
