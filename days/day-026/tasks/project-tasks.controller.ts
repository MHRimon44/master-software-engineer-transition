import {
  Body,
  Controller,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiParam } from '@nestjs/swagger';

import { AccessTokenGuard } from '../../day-025/auth/access-token.guard';
import { ProjectPermission } from '../auth/project-permission';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PositiveIntPipe } from '../../day-020/common/pipes/positive-int.pipe';
import { validateIdempotencyKey } from '../../day-029/common/validation/idempotency-key';
import { ProjectRolesGuard } from '../projects/project-roles.guard';
import { CreateTaskDto } from '../../day-020/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../day-020/tasks/dto/update-task.dto';
import { TasksService } from '../../day-018/tasks/tasks.service';

@ApiBearerAuth('access-token')
@Controller('projects/:projectId/tasks')
export class ProjectTasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AccessTokenGuard, ProjectRolesGuard)
  @RequirePermissions(ProjectPermission.CREATE_TASK)
  @ApiParam({
    name: 'projectId',
    example: 1,
    description: 'Positive integer project ID',
  })
  @ApiHeader({
    name: 'idempotency-key',
    required: false,
    example: 'create-project-task-abc-123',
    description:
      'Optional idempotency key with a maximum length of 128 characters',
  })
  create(
    @Param('projectId', PositiveIntPipe)
    projectId: number,
    @Body() dto: CreateTaskDto,
    @Headers('idempotency-key')
    idempotencyKey?: string,
  ) {
    const normalizedKey = validateIdempotencyKey(idempotencyKey);

    return this.tasksService.createForProject(projectId, dto, normalizedKey);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, ProjectRolesGuard)
  @RequirePermissions(ProjectPermission.UPDATE_TASK)
  @ApiParam({
    name: 'projectId',
    example: 1,
    description: 'Positive integer project ID',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Positive integer task ID',
  })
  update(
    @Param('projectId', PositiveIntPipe)
    projectId: number,
    @Param('id', PositiveIntPipe)
    taskId: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.updateForProject(projectId, taskId, dto);
  }
}
