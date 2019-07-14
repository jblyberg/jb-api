import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { PostStatus } from '../../modules/posts/post-status.enum';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column()
  status: PostStatus;

  @ManyToOne(type => User, user => user.posts, { eager: false })
  user: User;

  @ManyToMany(type => Tag, tag => tag.posts, { cascade: ['insert', 'update'] })
  tags: Tag[];

  @Column()
  userId: number;
}
