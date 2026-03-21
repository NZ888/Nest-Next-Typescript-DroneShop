import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {Request} from 'express';
export const UserDecorator = createParamDecorator(
    (data, ctx: ExecutionContext)=>{
        const contextHttp = ctx.switchToHttp();
        const request: Request = contextHttp.getRequest();
        console.log(request.user);
        return request.user;
    }
)