// /src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findByUsername(username);

      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result as User;
      }

      return null;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User): Promise<{ access_token: string }> {

    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(username: string, password: string): Promise<any> {
    try {
      // Check for username uniqueness before creating the user
      const existingUser = await this.usersService.findByUsername(username);

      if (existingUser) {
        throw new ConflictException('Username is already taken');
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Perform user registration logic
      const newUser = await this.usersService.createUser({ username, password: hashedPassword });
      const { password: _, ...result } = newUser;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Failed to create user');
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any> {
    const userData = await this.usersService.getUserById(userId)
    const user = await this.validateUser(userData.username, oldPassword);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Perform password change logic
      const updatedUser = await this.usersService.changePassword(userId, hashedPassword);
      const { password: _, ...result } = updatedUser;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Failed to change password');
    }
  }
}
