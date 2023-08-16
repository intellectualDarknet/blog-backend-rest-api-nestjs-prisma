import { ApiProperty } from '@nestjs/swagger';
import { Catalog } from '@prisma/client';

export class CatalogEntity implements Catalog {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  naming: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  onwer: Catalog;

  @ApiProperty()
  ownerId: number;

}