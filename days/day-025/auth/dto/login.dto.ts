import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strong-password',
    description: 'Account password',
  })
  @IsString()
  @MinLength(1)
  password: string;
}
