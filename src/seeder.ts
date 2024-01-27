import { seeder } from 'nestjs-seeder';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DatabaseModule } from './database/database.module';
// import { UserSeeder } from './app/user/seeders/user.seeder';
import { UserModule } from './app/user/user.module';

seeder({
    imports: [InfrastructureModule, DatabaseModule, UserModule],
});
// .run([UserSeeder]);
