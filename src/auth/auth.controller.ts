import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStarknetDto } from './dto/login-starknet.dto';
import { StarknetStrategy } from './strategies/starknet.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  }
}
