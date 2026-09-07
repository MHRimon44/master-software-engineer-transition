import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Learn NestJS authentication',
    description: 'Human-readable task title',
    maxLength: 120,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  title: string;
}
