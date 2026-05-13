import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";

@Module({
    imports: [
        ConfigModule,

        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const host = configService.get<string>("REDIS_HOST");
                const port = Number(configService.get<string>("REDIS_PORT"));

                if (!host || !port) {
                    throw new Error("REDIS_HOST or REDIS_PORT is not defined");
                }

                return {
                    connection: {
                        host,
                        port,
                    },
                };
            },
        }),
    ],
    exports: [BullModule],
})
export class BullCustomModule {}