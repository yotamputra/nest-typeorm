import { IsEmail, IsNotEmpty } from 'class-validator';

export class TestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
