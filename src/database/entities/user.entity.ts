import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from '../../enums/role.enum';
import { WorkoutEntity } from './workout.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  FirstName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  LastName: string;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.customer,
  })
  role: RoleEnum;

  @Column({ type: 'int', default: 0 })
  credits: number;

  @OneToMany(() => WorkoutEntity, (workout) => workout.user)
  Workouts: WorkoutEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: Date;

  @BeforeInsert()
  async passwordHash(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong .');
    }
  }
}