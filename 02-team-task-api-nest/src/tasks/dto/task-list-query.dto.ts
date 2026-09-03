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
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @IsOptional()
  @IsEnum(TaskStatusFilter)
  status?: TaskStatusFilter;

  @IsOptional()
  @IsEnum(TaskSortField)
  sortBy = TaskSortField.CREATED_AT;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection = SortDirection.DESC;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;
}
