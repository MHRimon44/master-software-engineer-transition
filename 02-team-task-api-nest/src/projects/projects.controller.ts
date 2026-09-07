import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/access-token.guard';
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
}
