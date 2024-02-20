import {
  //BeforeInsert,
  Column,
  CreateDateColumn,
  //DeleteDateColumn,
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


@Entity('Workout')
export class WorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false})
  trainingName: string;

  @Column({ type: 'text', nullable: false })
  dayOfWeek: string;

  @Column('jsonb', { nullable: false }) // Usando 'jsonb' para PostgreSQL, ajuste para seu banco de dados
  exercises: Exercise[];


@ManyToOne(() => UserEntity, (user) => user.Workouts)
user: UserEntity;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
