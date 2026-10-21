import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project_tasks')
export class ProjectTaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'project_id',
  })
  projectId!: number;

  @Column()
  title!: string;

  @Column({
    default: false,
  })
  completed!: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
