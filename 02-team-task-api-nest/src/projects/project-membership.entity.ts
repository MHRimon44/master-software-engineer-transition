import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Role } from '../auth/role';

@Entity('project_memberships')
@Unique(['projectId', 'userId'])
export class ProjectMembershipEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'project_id',
  })
  projectId!: number;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId!: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role!: Role;
}
