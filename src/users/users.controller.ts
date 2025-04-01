import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.create(email, password);

    return {
      message: ' User created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    };
  }

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.userService.login(email, password);

    return {
      message: 'User logged in successfully',
      data: {
        token: token,
      },
    };
  }

  @Get('/test')
  async test() {
    const secret = process.env.JWT_SECRET;
    return secret;
  }

  @Get("/input")
  async input(@Body() ) {
    const 
  }
}
