import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  create(CreateCatalogDto: CreateCatalogDto) {
    return this.prisma.catalog.create({ data: CreateCatalogDto });
  }

  getBookByAuthor() {

  }

  getBookByNaming() {
    
  }

  findAll() {
    return this.prisma.catalog.findMany({ where: { published: true } });
  }

  findOne(id: number) {
    return this.prisma.catalog.findUnique(
      { 
        where: { id },
        include: {
          author: true
        }
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
