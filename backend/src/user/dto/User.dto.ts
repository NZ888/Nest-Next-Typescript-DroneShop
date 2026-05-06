import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {Role} from "../../../generated/prisma/enums";
import { Exclude, Expose } from 'class-transformer';


export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number
    @Expose()
    uuid: string
    @Expose()
    email: string
    @Expose()
    name: string
    @Expose()
    surename: string | null
    @Expose()
    middleName: string | null
    @Expose()
    dateOfBirth: string | null
    @Expose()
    phone: string | null
    @Exclude()
    passwordHash: string
    @Expose()
    role: Role
    @Exclude()
    createdAt: Date
}