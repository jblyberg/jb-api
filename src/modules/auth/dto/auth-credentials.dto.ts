import { IsString, MinLength, MaxLength, Matches, IsEmail, IsOptional } from 'class-validator';

export class AuthCredentialsDto {
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

  @IsOptional()
  @IsString()
  @MaxLength(64)
  firstname: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  lastname: string;

}
