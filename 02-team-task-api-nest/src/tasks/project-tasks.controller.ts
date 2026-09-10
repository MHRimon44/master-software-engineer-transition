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
import { UpdateTaskDto } from './dto/update-task.dto';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { ProjectRolesGuard } from '../projects/project-roles.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { ProjectPermission } from '../auth/project-permission';
import { RequirePermissions } from '../auth/permissions.decorator';

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
      'Optional key used to make repeated create requests deterministic',
  })
  create(
    @Param('projectId', PositiveIntPipe)
    projectId: number,
    @Body() dto: CreateTaskDto,
    @Headers('idempotency-key')
    idempotencyKey?: string,
  ) {
    const normalizedKey = idempotencyKey?.trim() || undefined;

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
