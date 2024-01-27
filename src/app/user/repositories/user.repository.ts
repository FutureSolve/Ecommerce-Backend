import { User } from '../entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getUserRequestDto } from '../dto/requests/get-users-request.dto';

export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getFilteredUsers(filterUsersDto: getUserRequestDto): Promise<[User[], number]> {
        const query = await this.createQueryBuilder('user');

        // Remove admin user
        // query.where({ email: Not(ILike(`johnJames@example.com`)) });

        // Filter users with Email
        if (filterUsersDto.email) {
            query.where({ email: ILike(`%${filterUsersDto.email}%`) });
        }

        // Order results
        if (filterUsersDto.order || filterUsersDto.orderBy) {
            query.orderBy(`user.${filterUsersDto.orderBy}`, filterUsersDto.order);
        }
        // Limit and Offset
        if (filterUsersDto.limit || filterUsersDto.offset) {
            query.skip(filterUsersDto.offset).take(filterUsersDto.limit);
        }
        return query.getManyAndCount();
    }
}
