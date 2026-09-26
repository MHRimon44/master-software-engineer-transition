import { DataSource, Repository } from 'typeorm';

import { ProjectTaskEntity } from '../src/tasks/project-task.entity';
import { ProjectTasksRepository } from '../src/tasks/project-tasks.repository';

describe('ProjectTasksRepository (integration)', () => {
  let dataSource: DataSource;
  let typeOrmRepository: Repository<ProjectTaskEntity>;
  let repository: ProjectTasksRepository;

  beforeAll(async () => {
    if (process.env.DATABASE_NAME !== 'team_tasks_test') {
      throw new Error('Integration tests must run against team_tasks_test');
    }

    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: Number(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER ?? 'sara',
      password: process.env.DATABASE_PASSWORD ?? '',
      database: process.env.DATABASE_NAME,
      entities: [ProjectTaskEntity],
      synchronize: false,
    });

    await dataSource.initialize();

    typeOrmRepository = dataSource.getRepository(ProjectTaskEntity);

    repository = new ProjectTasksRepository(typeOrmRepository);
  });

  beforeEach(async () => {
    await typeOrmRepository.clear();
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await typeOrmRepository.clear();

      await dataSource.destroy();
    }
  });

  it('should create and persist a project task', async () => {
    const task = await repository.create(1, 'Integration test task');

    expect(task.id).toEqual(expect.any(Number));

    expect(task.projectId).toBe(1);

    expect(task.title).toBe('Integration test task');

    expect(task.completed).toBe(false);

    const persistedTask = await typeOrmRepository.findOne({
      where: {
        id: task.id,
      },
    });

    expect(persistedTask).not.toBeNull();

    expect(persistedTask?.title).toBe('Integration test task');
  });

  it('should find an existing task by id', async () => {
    const createdTask = await repository.create(10, 'Find me');

    const foundTask = await repository.findById(createdTask.id);

    expect(foundTask).not.toBeNull();

    expect(foundTask?.id).toBe(createdTask.id);

    expect(foundTask?.projectId).toBe(10);

    expect(foundTask?.title).toBe('Find me');
  });

  it('should return null when task does not exist', async () => {
    const result = await repository.findById(999999);

    expect(result).toBeNull();
  });

  it('should persist task updates', async () => {
    const task = await repository.create(20, 'Original title');

    task.title = 'Updated title';
    task.completed = true;

    const updatedTask = await repository.save(task);

    expect(updatedTask.title).toBe('Updated title');

    expect(updatedTask.completed).toBe(true);

    const persistedTask = await typeOrmRepository.findOne({
      where: {
        id: task.id,
      },
    });

    expect(persistedTask).not.toBeNull();

    expect(persistedTask?.title).toBe('Updated title');

    expect(persistedTask?.completed).toBe(true);
  });
});
