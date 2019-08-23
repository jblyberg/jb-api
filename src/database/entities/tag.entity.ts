import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 256,
    unique: true,
  })
  name: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Promise<Post[]>;
}
