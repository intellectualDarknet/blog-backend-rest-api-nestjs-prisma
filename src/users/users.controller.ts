import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/auth/guards/role/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/auth/guards/role/role.enum';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signUp(createUserDto)
  }

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {

    return await this.usersService.findAll()
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.usersService.findOne(+id)
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id)
  }

}
