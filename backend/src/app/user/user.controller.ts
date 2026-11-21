import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { UserRoles } from '../../common/types/enum/role.enum.js';
import { User } from '../../common/decorator/user.decorator.js';
import type { UserType } from '../../common/types/type/user.type.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,

    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ) {
    return this.userService.findAllUser(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @User() user: UserType,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user, id, updateUserDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  findMe(@User() user: UserType) {
    return this.userService.findMe(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@User() user: UserType, @Param('id') id: string) {
    return this.userService.removeUser(user, id);
  }
}
