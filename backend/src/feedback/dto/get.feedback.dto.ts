import { IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class GetFeedbackDto {
    @ApiProperty()
    @IsNumberString()
    @IsOptional()
    page:number
    @ApiProperty()
    @IsNumberString()
    @IsOptional()
    limit:number
}