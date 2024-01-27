// import { Injectable } from '@nestjs/common';
// import { Seeder } from 'nestjs-seeder';
// import { UserRepository } from '../repositories/user.repository';
// import { User } from '../entities/user.entity';
// import { UserTypeEnum } from '../enums/user-type.enum';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UserSeeder implements Seeder {
//     constructor(protected userRepository: UserRepository) {}

//     // async seed(): Promise<any> {
//     //     const admins = [
//     //         new User({
//     //             name: 'System Admin',
//     //             email: 'admin@bikerz.com',
//     //             password: await bcrypt.hash('VPFvRvBnjKacNq8VP7Bn', 10),
//     //             phoneNumber: '+2010101010101',
//     //             isVerified: true,
//     //             type: UserTypeEnum.ADMIN,
//     //         }),
//     //     ];
//     //     for (const admin of admins) {
//     //         await this.userRepository.upsert(admin, ['email']);
//     //     }
//     // }

//     async drop(): Promise<any> {
//         await this.userRepository.delete({ type: UserTypeEnum.ADMIN });
//     }
// }
