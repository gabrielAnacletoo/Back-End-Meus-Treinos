import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

interface Exercise {
  name: string;
  series: string;
  repetitions: string;
}

@Entity('Students')
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  Name: string;

  @Column({ type: 'text', nullable: false })
  Email: string

  @Column({ type: 'varchar', length: 256, nullable: true })
  profileImage: string;
  
  @Column('jsonb', { nullable: false }) // Usando 'jsonb' para PostgreSQL, ajuste para seu banco de dados
  exercises: Exercise[];

  @ManyToOne(() => UserEntity, (user) => user.Students)
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: Date;
}
