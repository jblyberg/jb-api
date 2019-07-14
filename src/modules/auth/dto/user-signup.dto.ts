import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class UserSignupDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' },
  )
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  firstname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  lastname: string;

}
