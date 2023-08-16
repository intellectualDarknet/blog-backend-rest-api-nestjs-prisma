import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async create(createCatalogDto: CreateCatalogDto) {

    const user = await this.prisma.user.findUnique({ where: {
      id: createCatalogDto.ownerId
    }})

    if(!user) {
      throw new NotFoundException(`No user found for this id`);
    }

    return this.prisma.catalog.create({ data: createCatalogDto });
  }

  getBooksByAuthor(data) {
    return this.prisma.catalog.findMany({ 
      where: {
        author: {
          contains: data.author
        }
      }
    });
  }

  getBooksByNaming(value) {
    return this.prisma.catalog.findMany({ 
      where: {
        naming: {
          contains: value.naming
        }
      }
    });
  }

  findAll() {
    return this.prisma.catalog.findMany();
  }

  findOne(id: number) {
    return this.prisma.catalog.findUnique(
      { 
        where: { id },
      }

      );
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return this.prisma.catalog.update({
      where: { id },
      data: updateCatalogDto,
    });
  }

  remove(id: number) {
    return this.prisma.catalog.delete({ where: { id } });
  }
}
