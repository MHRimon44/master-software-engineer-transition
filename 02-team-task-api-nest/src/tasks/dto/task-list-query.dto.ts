import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export enum TaskStatusFilter {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum TaskSortField {
  CREATED_AT = 'createdAt',
  TITLE = 'title',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class TaskListQueryDto {
  @ApiPropertyOptional({
    example: 1,
    default: 1,
    description: 'Page number starting from 1',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
    description: 'Maximum number of tasks per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional({
    enum: TaskStatusFilter,
    example: TaskStatusFilter.COMPLETED,
    description: 'Filter tasks by status',
  })
  @IsOptional()
  @IsEnum(TaskStatusFilter)
  status?: TaskStatusFilter;

  @ApiPropertyOptional({
    enum: TaskSortField,
    example: TaskSortField.CREATED_AT,
    default: TaskSortField.CREATED_AT,
    description: 'Field used to sort the task list',
  })
  @IsOptional()
  @IsEnum(TaskSortField)
  sortBy = TaskSortField.CREATED_AT;

  @ApiPropertyOptional({
    enum: SortDirection,
    example: SortDirection.DESC,
    default: SortDirection.DESC,
    description: 'Sorting direction',
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection = SortDirection.DESC;

  @ApiPropertyOptional({
    example: 'nestjs',
    description: 'Text search against task title',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;
}
