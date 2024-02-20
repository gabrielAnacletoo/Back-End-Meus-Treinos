import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

import { RoleEnum } from '../../enums/role.enum';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  Name: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  Email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  password: string;


}
