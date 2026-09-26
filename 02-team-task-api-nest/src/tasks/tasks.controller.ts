import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiParam } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/access-token.guard';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { validateIdempotencyKey } from '../common/validation/idempotency-key';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskListQueryDto } from './dto/task-list-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() query: TaskListQueryDto) {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 42,
    description: 'Positive integer task ID',
  })
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiHeader({
    name: 'Idempotency-Key',
    required: false,
    example: 'create-task-abc-123',
    description:
      'Optional idempotency key with a maximum length of 128 characters',
  })
  create(
    @Body() dto: CreateTaskDto,
    @Headers('idempotency-key')
    idempotencyKey?: string,
  ) {
    const normalizedKey = validateIdempotencyKey(idempotencyKey);

    return this.tasksService.create(dto, normalizedKey);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: 42,
    description: 'Positive integer task ID',
  })
  update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }
}
