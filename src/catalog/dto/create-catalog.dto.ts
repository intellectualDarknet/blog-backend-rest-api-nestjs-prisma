import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsOptional, MaxLength, IsBoolean } from "class-validator";

export class CreateCatalogDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    author: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({ required: false })
    naming: string;
}
