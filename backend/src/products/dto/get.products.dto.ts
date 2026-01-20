import {ApiProperty} from "@nestjs/swagger";
import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsDto {
    @ApiProperty()
    @IsNumberString()
    @IsOptional()
    page:number
    @ApiProperty()
    @IsNumberString()
    @IsOptional()
    limit:number
}