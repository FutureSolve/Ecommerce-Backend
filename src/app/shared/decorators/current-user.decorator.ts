import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'App/user/entities/user.entity';

const getCurrentUserByContext = (_data: keyof User | undefined, context: ExecutionContext): User | keyof User => {
    const user = context.switchToHttp().getRequest().user;
    return _data ? user[_data] : user;
};

export const CurrentUser = createParamDecorator((_data: keyof User | undefined, context: ExecutionContext) =>
    getCurrentUserByContext(_data, context),
);
