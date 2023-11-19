// /src/modules/users/users.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.usersService.findByUsername(id);
  }

  @Post('change-password/:id')
  changePassword(@Param('id') id: string, @Body() body: any) {
    return this.usersService.changePassword(id, body.newPassword);
  }
}
