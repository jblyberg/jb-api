import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn,
  VersionColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @VersionColumn()
  version: number;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(type => Post, post => post.comments, { eager: false })
  post: Post;

}
