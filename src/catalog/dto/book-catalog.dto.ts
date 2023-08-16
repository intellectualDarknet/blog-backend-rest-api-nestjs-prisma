import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsOptional, MaxLength, IsBoolean } from "class-validator";

export class BookCatalog {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    books: string;
}
