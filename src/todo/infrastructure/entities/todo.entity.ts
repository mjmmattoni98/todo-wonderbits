import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false, name: 'is_completed', default: false })
  isCompleted: boolean;
  @Column({ nullable: false, name: 'created_at', default: new Date() })
  createdAt: Date;
  @Column({ nullable: false, name: 'updated_at', default: new Date() })
  updatedAt: Date;
  @Column({ name: 'deleted_at' })
  deletedAt: Date;
}
