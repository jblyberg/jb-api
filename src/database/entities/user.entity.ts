import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as argon2 from 'argon2';
import { Post } from './post.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: null})
  firstname: string;

  @Column({default: null})
  lastname: string;

  @OneToMany(type => Post, post => post.user, { eager: false })
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
