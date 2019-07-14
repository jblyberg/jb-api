import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
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

  @ManyToMany(type => Post, post => post.tags, { cascade: ['insert', 'update'] })
  @JoinTable()
  posts: Post[];

}
