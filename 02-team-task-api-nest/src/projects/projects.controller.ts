import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/access-token.guard';

import type { AuthenticatedRequest } from '../auth/authenticated-request';

import { CreateProjectDto } from './dto/create-project.dto';

import { ProjectsService } from './projects.service';

@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Post()
  create(
    @Body()
    dto: CreateProjectDto,

    @Req()
    request: AuthenticatedRequest,
  ) {
    return this.projectsService.create(dto, request.user.id);
  }
}
