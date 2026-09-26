import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { Role } from '../src/auth/role';
import { AppModule } from '../src/app.module';

describe('Team Task API (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    if (process.env.DATABASE_NAME !== 'team_tasks_test') {
      throw new Error('E2E tests must run against team_tasks_test');
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    dataSource = moduleFixture.get(DataSource);
  });

  beforeEach(async () => {
    await dataSource.query('DELETE FROM project_tasks');

    await dataSource.query('DELETE FROM project_memberships');

    await dataSource.query('DELETE FROM projects');

    await dataSource.query('DELETE FROM users');
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.query('DELETE FROM project_tasks');

      await dataSource.query('DELETE FROM project_memberships');

      await dataSource.query('DELETE FROM projects');

      await dataSource.query('DELETE FROM users');
    }

    await app.close();
  });

  it('/ (GET) should return the response envelope', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.body).toEqual({
      requestId: expect.any(String),
      data: 'Hello World!',
    });
  });

  it('should register and login a user', async () => {
    const email = 'e2e@example.com';
    const password = 'strong-password';

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
      })
      .expect(201);

    expect(registerResponse.body.requestId).toEqual(expect.any(String));

    expect(registerResponse.body.data).toEqual({
      id: expect.any(String),
      email,
    });

    expect(registerResponse.body.data).not.toHaveProperty('password');

    expect(registerResponse.body.data).not.toHaveProperty('passwordHash');

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(200);

    expect(loginResponse.body.requestId).toEqual(expect.any(String));

    expect(loginResponse.body.data.user).toEqual({
      id: registerResponse.body.data.id,
      email,
    });

    expect(loginResponse.body.data.tokens.accessToken).toEqual(
      expect.any(String),
    );

    expect(loginResponse.body.data.tokens.refreshToken).toEqual(
      expect.any(String),
    );
  });

  it('should reject access to protected project tasks without an access token', async () => {
    await request(app.getHttpServer())
      .post('/projects/1/tasks')
      .send({
        title: 'Protected task',
      })
      .expect(401);
  });

  it('should login and create a task in an owned project', async () => {
    const email = 'task-owner@example.com';

    const password = 'strong-password';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
      })
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(200);

    const accessToken = loginResponse.body.data.tokens.accessToken;

    expect(accessToken).toEqual(expect.any(String));

    const projectResponse = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'E2E Project',
      })
      .expect(201);

    const project = projectResponse.body.data;

    expect(project).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'E2E Project',
      }),
    );

    const membershipRows = await dataSource.query<
      Array<{
        project_id: number;
        user_id: string;
        role: string;
      }>
    >(
      `
          SELECT
            project_id,
            user_id,
            role
          FROM project_memberships
          WHERE project_id = $1
        `,
      [project.id],
    );

    expect(membershipRows).toHaveLength(1);

    expect(membershipRows[0]).toEqual(
      expect.objectContaining({
        project_id: project.id,
        role: Role.OWNER,
      }),
    );

    const taskResponse = await request(app.getHttpServer())
      .post(`/projects/${project.id}/tasks`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('idempotency-key', 'e2e-create-task-1')
      .send({
        title: 'E2E protected task',
      })
      .expect(201);

    expect(taskResponse.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        projectId: project.id,
        title: 'E2E protected task',
        completed: false,
      }),
    );

    const taskRows = await dataSource.query<
      Array<{
        id: number;
        project_id: number;
        title: string;
        completed: boolean;
      }>
    >(
      `
          SELECT
            id,
            project_id,
            title,
            completed
          FROM project_tasks
          WHERE id = $1
        `,
      [taskResponse.body.data.id],
    );

    expect(taskRows).toHaveLength(1);

    expect(taskRows[0]).toEqual(
      expect.objectContaining({
        project_id: project.id,
        title: 'E2E protected task',
        completed: false,
      }),
    );
  });
});
