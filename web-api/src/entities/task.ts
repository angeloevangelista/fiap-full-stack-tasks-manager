import * as yup from 'yup';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 200 })
  description: string;

  @Column()
  deadline: Date;

  @Column()
  completed: boolean;
}

const TaskSchema: yup.ObjectSchema<Task> = yup.object({
  title: yup
    .string()
    .required()
    .max(50, 'title must have no more than 50 characters'),
  description: yup
    .string()
    .required()
    .max(200, 'description must have no more than 200 characters'),
  deadline: yup
    .date()
    .required()
    .min(new Date(), "you can't set a deadline that has already expired"),

  id: yup.string().uuid().optional(),
  created_at: yup.date().default(new Date()),
  updated_at: yup.date().default(new Date()),
  deleted_at: yup.date().optional(),
  completed: yup.bool().default(false),
});

export { Task, TaskSchema };
