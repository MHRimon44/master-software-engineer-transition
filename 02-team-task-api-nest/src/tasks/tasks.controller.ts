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
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MockAuthGuard } from '../auth/mock-auth.guard';
import { TaskListQueryDto } from './dto/task-list-query.dto';

@UseGuards(MockAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() query: TaskListQueryDto) {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @Headers('idempotency-key')
    idempotencyKey?: string,
  ) {
    const normalizedKey = idempotencyKey?.trim() || undefined;

    return this.tasksService.create(dto, normalizedKey);
  }

  @Patch(':id')
  update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }
}
