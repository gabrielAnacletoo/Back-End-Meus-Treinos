import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from 'src/database/entities';
import { UsersModule } from 'src/users/users.module';
import { WorkoutController } from './workouts.controller';
import { WorkoutService } from './workouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity]), UsersModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
