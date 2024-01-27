import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

config();

/**
 * Custom Data source configuration for typeorm seeder
 */
export const seederDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/seeds/*.js'],
    logger: 'advanced-console',
    migrationsTableName: 'seeds',
};

const seedsDataSource = new DataSource(seederDataSourceOptions);

export default seedsDataSource;
