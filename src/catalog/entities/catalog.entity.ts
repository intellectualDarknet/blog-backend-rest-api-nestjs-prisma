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

  // constructor({ author, ...data }: Partial<ArticleEntity>) {
  //   Object.assign(this, data);

  //   if (author) {
  //     this.author = new UserEntity(author);
  //   }
  // }
}