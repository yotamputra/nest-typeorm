import { IsString } from 'class-validator';

export class InputDto {
  @IsString()
  input: string;
}
