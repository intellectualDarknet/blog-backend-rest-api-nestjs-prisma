import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
    }
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: "Admin" | "User";
  
    @Exclude()
    password: string;
}
