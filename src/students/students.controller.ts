import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Roles } from 'src/auth/decorators/roles';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RolesGuards } from 'src/auth/guards/role-guard';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UserEntity } from 'src/database/entities';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Post()
  create(
    @CurrentUser() currentUser: UserEntity,
    @Body() StudentPayload: CreateStudentDto) {
    return this.studentsService.create(+currentUser.id, StudentPayload);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
