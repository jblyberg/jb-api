import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../../database/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserSignupDto } from './dto/user-signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userSignupDto: UserSignupDto): Promise<void> {
    const { email, password, firstname, lastname } = userSignupDto;

    const user = new User();
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') { // duplicate email
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const email = authCredentialsDto.email.toLowerCase().trim();
    const password = authCredentialsDto.password;

    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
