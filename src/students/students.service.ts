import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity, UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { FileDTO } from 'src/auth/dto/files.dto';

@Injectable()
export class StudentsService {
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>
  @InjectRepository(StudentsEntity)
  private StudentRepository: Repository<StudentsEntity>

  async create(personalId: number, studentPayload: CreateStudentDto) {
    const { Email } = studentPayload;
    
    try {
      const findStudent = await this.StudentRepository.findOne({ where: { Email } });
      
      if (findStudent) {
        throw new BadRequestException("Já existe um aluno com o mesmo e-mail registrado.");
      }
      
      const createdStudent = this.StudentRepository.create(studentPayload);
      await this.StudentRepository.save(createdStudent);
      
      const personal = await this.UserRepository.findOne({ 
        where: { id: personalId },
        relations: ['Students']
      });
  
      if (!personal) {
        throw new NotFoundException('Personal não encontrado.');
      }
  
      personal.Students.push(createdStudent);
      await this.UserRepository.save(personal);
  
      return createdStudent;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  
  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
