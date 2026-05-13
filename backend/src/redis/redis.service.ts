import {Inject, Injectable} from "@nestjs/common";
import {REDIS_CLIENT} from "@/redis/common/redis.constants";
import {RedisClientType} from "redis";

@Injectable()
export class RedisService {
    constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {
    }
    async set(key: string, value: any, ttl?: number){
        if(ttl){
            await this.redis.set(key, value, {
                EX: ttl
            });
            return;
        }
    }

    async get(key: string){
        return this.redis.get(key);
    }
}