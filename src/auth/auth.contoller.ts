import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/files.dto';
import { UserRegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Roles } from '../auth/decorators/roles';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guards/auth-guard';
import { RolesGuards } from './guards/role-guard';
import { RoleEnum } from 'src/enums/role.enum';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(
    @Body() UserPayLoad: UserRegisterDto,
    @UploadedFile() image: FileDTO,
  ) {
    return await this.authService.RegisterAuthService(UserPayLoad, image);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @HttpCode(200)
  @Post('personal')
  async loginPersonal(@Body() PayLoad: LoginDTO) {
    return await this.authService.LoginAuthServicePersonal(PayLoad);
  }

  @HttpCode(200)
  @Post()
  async login(@Body() PayLoad: LoginDTO) {
    return await this.authService.LoginAuthService(PayLoad);
  }
}



