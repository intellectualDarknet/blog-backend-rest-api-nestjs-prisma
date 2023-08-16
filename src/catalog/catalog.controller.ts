import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CatalogEntity } from './entities/catalog.entity';
import { AuthorCatalog } from './dto/author-catalog.dto';
import { BookCatalog } from './dto/book-catalog.dto';
import { Roles } from 'src/auth/guards/role/roles.decorator';
import { Role } from 'src/auth/guards/role/role.enum';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiCreatedResponse({ type: CatalogEntity })
  @ApiBearerAuth()
  async create(@Body() createCatalogDto: CreateCatalogDto) {
    return await this.catalogService.create(createCatalogDto)
  }

  @Post('AuthorsBooks')
  @Roles(Role.User)
  @ApiCreatedResponse({ type: CatalogEntity })
  @ApiOkResponse({ type: CatalogEntity, isArray: true })
  @ApiBearerAuth()
  async getBooksByAuthor(@Body() authorCatalog: AuthorCatalog) {
    return await this.catalogService.getBooksByAuthor(authorCatalog)
  }

  @Post('booksByNaming')
  @Roles(Role.User)
  @ApiCreatedResponse({ type: CatalogEntity })
  @ApiOkResponse({ type: CatalogEntity, isArray: true })
  @ApiBearerAuth()
  async getBooksByNaming(@Body() bookCatalog: BookCatalog) {
    return await this.catalogService.getBooksByNaming(bookCatalog)
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOkResponse({ type: CatalogEntity, isArray: true })
  @ApiBearerAuth()
  async findAll() {
    return await this.catalogService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOkResponse({ type: CatalogEntity })
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const catalog = await this.catalogService.findOne(id)

    if(!catalog) {
      throw new NotFoundException(`catalog with ${id} does not exist.`)
    }

    return catalog
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CatalogEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    const catalog = await this.catalogService.findOne(id)

    if(!catalog) {
      throw new NotFoundException(`catalog with ${id} does not exist.`)
    }

    return await this.catalogService.update(id, updateCatalogDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CatalogEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {

    const catalog = await this.catalogService.findOne(id)

    if(!catalog) {
      throw new NotFoundException(`catalog with ${id} does not exist.`)
    }

    return await this.catalogService.remove(id)
  }
}
