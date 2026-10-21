import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProjectTaskEntity } from './project-task.entity';

@Injectable()
export class ProjectTasksRepository {
  constructor(
    @InjectRepository(ProjectTaskEntity)
    private readonly repository: Repository<ProjectTaskEntity>,
  ) {}

  create(projectId: number, title: string) {
    const task = this.repository.create({
      projectId,
      title,
      completed: false,
    });

    return this.repository.save(task);
  }

  findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  save(task: ProjectTaskEntity) {
    return this.repository.save(task);
  }
}
