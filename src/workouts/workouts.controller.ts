import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WorkoutService } from './workouts.service';
import { UpdateWorkoutDto } from './dto/update-workouts.dto';
import { Roles } from '../auth/decorators/roles';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuards } from '../auth/guards/role-guard';
import { RoleEnum } from '../enums/role.enum';
import { CreateWorkoutDto } from './dto/create-workouts.dto';
import { UserEntity } from 'src/database/entities';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly WorkoutService: WorkoutService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Post()
  create(
    @CurrentUser() currentUser: UserEntity,
    @Body() CreateWorkout: CreateWorkoutDto,
  ) {
    return this.WorkoutService.CreateWorkout(+currentUser.id, CreateWorkout);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Get()
  findAll() {
    return this.WorkoutService.FindWorkout();
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.WorkoutService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateWorkout: UpdateWorkoutDto) {
    return this.WorkoutService.UpdateWorkout(+id, UpdateWorkout);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.WorkoutService.RemoveWorkout(+id);
  }
}
