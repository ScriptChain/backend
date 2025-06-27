
import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStarknetDto } from './dto/login-starknet.dto';
import { StarknetStrategy } from './strategies/starknet.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('starknet/login')
  async loginStarknet(@Body() loginDto: LoginStarknetDto) {
    const user = await this.authService.validateStarknetUser(loginDto.address);
    return this.authService.login(user);
  }

  @Get('nonce')
  async getNonce(@Query('address') address: string) {
    if (!address) {
      throw new Error('Address is required');
    }
    return this.authService.getNonce(address);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('role') role?: UserRole,
  ) {
    return this.authService.signup(email, password, firstName, lastName, role);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password)
  }
}
