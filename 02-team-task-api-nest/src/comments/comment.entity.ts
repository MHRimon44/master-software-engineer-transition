import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'task_id',
  })
  taskId!: number;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId!: string;

  @Column({
    type: 'text',
  })
  body!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
