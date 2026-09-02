import { Controller, Get, UseGuards } from '@nestjs/common';

import { MockAuthGuard } from '../auth/mock-auth.guard';
import { ProjectsService } from './projects.service';

@UseGuards(MockAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
