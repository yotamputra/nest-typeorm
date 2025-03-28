import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';
import { comparePass } from 'src/common/helpers/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const checkUser = await this.findByEmail(email);

    if (checkUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create({
      email,
      password,
      isAdmin: false,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const validate = await comparePass(password, user.password);

    if (!validate) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
