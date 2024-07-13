import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;
  @Column({ name: 'created_at', default: new Date() })
  createdAt: Date;
  // @Column({ name: 'user_id' })
  // userId: string;
}
