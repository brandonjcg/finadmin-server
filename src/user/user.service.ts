import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return {
      data: [
        {
          id: 1,
          email: '',
          fullName: '',
        },
      ],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
