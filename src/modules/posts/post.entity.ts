import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PostStatus } from './post-status.enum';
import { User } from '../auth/user.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  status: PostStatus;

  @ManyToOne(type => User, user => user.posts, { eager: false })
  user: User;

  @Column()
  userId: number;
}
