import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  findAll() {
    return ['project-1', 'project-2'];
  }
}
