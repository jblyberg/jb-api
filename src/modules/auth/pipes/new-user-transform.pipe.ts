import { PipeTransform } from '@nestjs/common';
import { UserSignupDto } from '../dto/user-signup.dto';

export class NewUserTransformPipe implements PipeTransform {

  transform(userSignupDto: UserSignupDto) {
    userSignupDto.email = userSignupDto.email.toLowerCase().trim();
    return userSignupDto;
  }

}
