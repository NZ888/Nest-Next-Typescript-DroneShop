import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from "@/prisma/prisma.service";
import {plainToInstance} from "class-transformer";
import {UserDto} from "@/user/dto/User.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserInfo(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {uuid: userId},
            })
            return plainToInstance(UserDto, user, {
                excludeExtraneousValues: true,
            });
        }
        catch (error) {
            throw new NotFoundException({}, `User with id ${userId} not found`);
        }

    }
}
