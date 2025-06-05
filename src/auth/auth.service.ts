import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, AuthMethod } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateStarknetUser(address: string) {
    // Normalize the address (remove 0x prefix and convert to lowercase)
    const normalizedAddress = address.toLowerCase().startsWith('0x')
      ? address.toLowerCase()
      : `0x${address.toLowerCase()}`;

    // Find existing user by StarkNet address
    let user = await this.usersRepository.findOne({
      where: { starknetAddress: normalizedAddress },
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = this.usersRepository.create({
        starknetAddress: normalizedAddress,
        authMethod: AuthMethod.STARKNET,
        isActive: true,
      });
      await this.usersRepository.save(user);
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      address: user.starknetAddress,
      authMethod: user.authMethod,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        address: user.starknetAddress,
        authMethod: user.authMethod,
      },
    };
  }

  async getNonce(address: string) {
    // In a production app, you might want to store this nonce temporarily
    // and verify it when the user signs in to prevent replay attacks
    const nonce = Math.floor(Math.random() * 1000000).toString();
    const message = `Sign this message to authenticate: ${nonce}`;
    
    return { nonce, message };
  }
}
