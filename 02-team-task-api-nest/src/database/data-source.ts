import 'dotenv/config';

import { DataSource } from 'typeorm';

import { UserEntity } from '../users/user.entity';

import { ProjectEntity } from '../projects/project.entity';

import { ProjectMembershipEntity } from '../projects/project-membership.entity';

import { ProjectTaskEntity } from '../tasks/project-task.entity';

import { CommentEntity } from '../comments/comment.entity';

export default new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST ?? 'localhost',

  port: Number(process.env.DATABASE_PORT ?? '5432'),

  username: process.env.DATABASE_USER ?? 'postgres',

  password: process.env.DATABASE_PASSWORD ?? 'postgres',

  database: process.env.DATABASE_NAME ?? 'team_tasks',

  entities: [
    UserEntity,
    ProjectEntity,
    ProjectMembershipEntity,
    ProjectTaskEntity,
    CommentEntity,
  ],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});
