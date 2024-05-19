import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity({ name: 'tasks' })
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
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

export { Task };
