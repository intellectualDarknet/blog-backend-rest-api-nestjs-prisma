import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/role';
import { Role } from 'src/common/role.enum';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @Roles(Role.Admin)
  @ApiCreatedResponse({ type: UserEntity })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.signUp(createUserDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const all = await this.usersService.findAll();
    return all.map((elem) => new UserEntity(elem))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return new UserEntity(await this.usersService.findOne(+id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }

  
}