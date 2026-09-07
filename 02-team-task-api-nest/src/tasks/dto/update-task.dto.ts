import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Finish NestJS authentication',
    description: 'Updated task title',
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the task is completed',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
