import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workouts.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
