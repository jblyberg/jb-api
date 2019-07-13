import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Post } from '../posts/post.entity';

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

  @OneToMany(type => Post, post => post.user, { eager: true })
  posts: Post[];

  salt(): string {
    return this.password.substring(0, 29);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt());
    return hash === this.password;
  }
}
