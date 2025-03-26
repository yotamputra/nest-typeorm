import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/register")
  async register(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.userService.create(email, password);

    return {
      message: ' User created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
      },
    };
  }
}
