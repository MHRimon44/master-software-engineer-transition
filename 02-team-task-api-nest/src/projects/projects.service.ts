import { Injectable } from '@nestjs/common';

import type { CreateProjectDto } from './dto/create-project.dto';
import type { Project } from './project';

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [];

  private nextProjectId = 1;

  findAll(): Project[] {
    return [...this.projects];
  }

  create(input: CreateProjectDto): Project {
    const project: Project = {
      id: this.nextProjectId++,
      name: input.name,
    };

    this.projects.push(project);

    return project;
  }
}
