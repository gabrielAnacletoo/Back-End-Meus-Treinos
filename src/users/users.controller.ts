import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from '../enums/role.enum';
import { RolesGuards } from '../auth/guards/role-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles';
import { AuthGuard } from '../auth/guards/auth-guard';
import { UserEntity } from '../database/entities/index';
import { ChangePasswordDto } from './dto/update-user.password.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedUserDoc } from 'src/auth/docs/created-user.doc';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Get('infouser')
  InfoUser(@CurrentUser() currentUser: UserEntity) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.usersService.FindAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.FindOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPayload: UpdateUserDto) {
    return this.usersService.UpdateUser(+id, updateUserPayload);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.RemoveUser(+id);
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch('chg/password') // Correção na rota, adicionando o ':'
  async updatePassword(
    @Body() NewPassWord: ChangePasswordDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.ChangePassword(currentUser.id, NewPassWord);
  }
}
