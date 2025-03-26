import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/register")
  register(@Body('email') email: string, @Body('password') password: string) {
    const user = this.userService.create();

    return {
      message: ' User created successfully',
      data: {
        user,
      },
    };
  }
}
