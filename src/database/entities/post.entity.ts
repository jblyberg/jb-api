import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';
import { PostStatus } from '../../modules/posts/post-status.enum';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @VersionColumn()
  version: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column()
  status: PostStatus;

  @ManyToOne(type => User, user => user.posts, { eager: false })
  user: User;

  @OneToMany(type => Comment, comment => comment.post, { eager: false })
  comments: Comment[];

  @Column()
  userId: number;

  @ManyToMany(type => Tag, tag => tag.posts, { eager: true })
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];
}
