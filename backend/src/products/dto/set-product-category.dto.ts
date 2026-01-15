import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class SetProductCategoriesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    categoryIds!: string[];
}