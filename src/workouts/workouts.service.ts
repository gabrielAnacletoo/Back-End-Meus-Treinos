import {
  Injectable,
  UnsupportedMediaTypeException,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workouts.dto';
import { UpdateWorkoutDto } from './dto/update-workouts.dto';
import { FileDTO } from '../auth/dto/files.dto';
import { Repository } from 'typeorm';
import { appFireBase } from '../firebase/firebase.config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/index';
import { WorkoutEntity } from '../database/entities/index';
const storage = getStorage(appFireBase);

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutEntity)
    private WorkoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async CreateWorkout(id: number, CreateWorkoutPayload: CreateWorkoutDto) {
    try {
      const FindUser = await this.userRepository.findOne({
        where: { id: id },
        relations: { Workouts: true },
      });
      if (!FindUser) {
        throw new BadRequestException('Usuário não encontrado.');
      }

      // Verificar se o usuário já possui um treino cadastrado para o mesmo dia da semana
      const hasExistingWorkout = FindUser.Workouts.some(
        (workout) => workout.dayOfWeek === CreateWorkoutPayload.dayOfWeek,
      );
      if (hasExistingWorkout) {
        throw new BadRequestException(
          'Já existe um treino cadastrado para esse dia da semana.',
        );
      }

      // Cria o workout em seguida associa ao usuário
      const newWorkout = this.WorkoutRepository.create(CreateWorkoutPayload);
      await this.WorkoutRepository.save(newWorkout);

      // Adiciona o novo treino ao array de treinos do usuário usando spread
      const updatedUser = {
        ...FindUser,
        Workouts: [...FindUser.Workouts, newWorkout],
      };

      await this.userRepository.save(updatedUser);

      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async FindWorkout() {
    try {
      const result = await this.WorkoutRepository.find()
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async UpdateWorkout(id: number, UpdateWorkout: UpdateWorkoutDto) {
    try {
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async RemoveWorkout(id: number) {
    try {
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
