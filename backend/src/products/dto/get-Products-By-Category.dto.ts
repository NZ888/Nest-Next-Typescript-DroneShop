import { IsString, IsUrl } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class GetProductsByCategoryDto{
    @ApiProperty()
    @IsString()
    name: string
    @ApiProperty()
    @IsString()
    slug: string
    @ApiProperty()
    @IsUrl()
    image: string
}


//
// model Category {
//     id        String    @id @default(cuid())
//     name      String    @unique
//     slug      String    @unique
//     products  Product[]
//     image     String?
//         createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
// }