import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CatalogEntity } from './entities/catalog.entity';
import { AuthorCatalog } from './dto/author-catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: CatalogEntity })
  @ApiBearerAuth()
  async create(@Body() createCatalogDto: CreateCatalogDto) {
    // return new CatalogEntity(await this.catalogService.create(createCatalogDto));
    return await this.catalogService.create(createCatalogDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CatalogEntity, isArray: true })
  async getBooksByAuthor(@Body() authorCatalog: AuthorCatalog) {
    return await this.catalogService.getBookByAuthor(authorCatalog)
  }

  // TO DO !@#@!#!@
  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ type: CatalogEntity, isArray: true })
  // async getBookByNaming() {
  //   const all = await this.catalogService.findAll();
  //   return all.map((elem) => new CatalogEntity(elem))
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CatalogEntity, isArray: true })
  async findAll() {
    // const all = await this.catalogService.findAll();
    // return all.map((elem) => new CatalogEntity(elem))

    return await this.catalogService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CatalogEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {


    const catalog = await this.catalogService.findOne(id)

    if(!catalog) {
      throw new NotFoundException(`catalog with ${id} does not exist.`)
    }

    return catalog

    // return new CatalogEntity(article)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CatalogEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return await this.catalogService.update(id, updateCatalogDto)
    // 
    // return new CatalogEntity(
    //   await this.catalogService.update(id, updateArticleDto),
    // );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CatalogEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.catalogService.remove(id)
    // return new CatalogEntity(await this.catalogService.remove(id));
  }
}
