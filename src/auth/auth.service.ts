import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {  AuthMethod } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';


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

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, role: user.role };

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

        email: user.email,
        role: user.role,
      },
    };
  }

  async signup(email: string, password: string, firstName: string, lastName: string, role: UserRole = UserRole.USER) {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashed, firstName, lastName, role });
    await this.usersRepository.save(user);
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

  }
}
