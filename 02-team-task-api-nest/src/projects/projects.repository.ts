import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
  ) {}

  findAll(): Promise<ProjectEntity[]> {
    return this.repository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  createWithManager(
    manager: EntityManager,
    name: string,
  ): Promise<ProjectEntity> {
    const repository = manager.getRepository(ProjectEntity);

    const project = repository.create({
      name,
    });

    return repository.save(project);
  }
}
