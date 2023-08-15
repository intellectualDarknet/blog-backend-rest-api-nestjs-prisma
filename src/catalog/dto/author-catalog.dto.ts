import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsOptional, MaxLength, IsBoolean } from "class-validator";

export class AuthorCatalog {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    author: string;
}
