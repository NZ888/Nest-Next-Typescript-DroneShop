import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {REDIS_CLIENT} from "@/redis/common/redis.constants";
import {createClient} from "redis"
import {RedisService} from "@/redis/redis.service";
@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: REDIS_CLIENT,
            useFactory: async (config: ConfigService) => {
                const host = config.get('REDIS_HOST');
                const port = config.get('REDIS_PORT');

                const client = createClient({
                    url: `redis://${host}:${port}`,
                })
                client.on('error', (err) => {
                    console.error('Redis error:', err);
                });
                await client.connect();
                return client;
            },
            inject: [ConfigService],
        },
      RedisService
    ],
    exports: [REDIS_CLIENT, RedisService]
})

export class RedisModule{}