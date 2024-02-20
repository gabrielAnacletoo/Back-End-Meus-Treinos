import { IsNotEmpty, IsString, ValidateNested, Length } from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  series: string;

  @IsString()
  @IsNotEmpty()
  repetitions: string;
}

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  trainingName: string;

  @IsNotEmpty()
  @IsString()
  dayOfWeek: string;

  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  @IsNotEmpty()
  exercises: ExerciseDto[];
}
