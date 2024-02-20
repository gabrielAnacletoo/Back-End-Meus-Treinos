import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  UserEntity, WorkoutEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WorkoutEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
