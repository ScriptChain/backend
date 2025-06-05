import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class LoginStarknetDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  @IsNotEmpty()
  signature: string[];
}
