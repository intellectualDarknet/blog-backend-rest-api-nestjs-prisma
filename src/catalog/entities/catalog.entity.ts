import { ApiProperty } from '@nestjs/swagger';
import { Catalog } from '@prisma/client';

export class CatalogEntity implements Catalog {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;

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

enum Role {
  User,
  Admin
}