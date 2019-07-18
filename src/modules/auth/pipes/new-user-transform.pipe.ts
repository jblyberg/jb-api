import { PipeTransform } from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';

export class NewUserTransformPipe implements PipeTransform {

  /**
   * Normalizes all new email address submissions by trimming and converting them
   * to lower case.
   *
   * @param userSignupDto : UserSignupDto
   */
  transform(userSignupDto: UserSignupDto) {
    userSignupDto.email = userSignupDto.email.toLowerCase().trim();
    return userSignupDto;
  }

}
