import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() UserPayLoad: UserRegisterDto,
  ) {
    return await this.authService.RegisterAuthService(UserPayLoad);
  }


  @HttpCode(200)
  @Post()
  async login(@Body() PayLoad: LoginDTO) {
    return await this.authService.LoginAuthService(PayLoad);
  }
}



