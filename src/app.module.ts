import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workouts/workouts.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    WorkoutModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
