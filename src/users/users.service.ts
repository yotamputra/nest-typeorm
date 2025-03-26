import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const checkUser = await this.findByEmail(email);

    if (checkUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create({ email, password, isAdmin: false });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
