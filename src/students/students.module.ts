import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity } from 'src/database/entities';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity]), UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
