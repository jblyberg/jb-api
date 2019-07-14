import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from '../posts/post.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

}
