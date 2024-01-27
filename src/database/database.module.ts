import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                return {
                    type: 'postgres',
                    ...config.get('database'),
                    timezone: 'Z',
                } as TypeOrmModuleAsyncOptions;
            },
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                return addTransactionalDataSource(dataSource);
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
