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

  getBookByAuthor(value) {
    return this.prisma.catalog.findMany({ 
      where: {
        author: {
          contains: value
        }
      }
    });
  }

  getBookByNaming(value) {
    return this.prisma.catalog.findMany({ 
      where: {
        naming: {
          contains: value
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
