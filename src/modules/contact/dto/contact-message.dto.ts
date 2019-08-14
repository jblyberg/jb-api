import { IsString, MinLength, MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class ContactMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsNotEmpty()
  message: string;
}
