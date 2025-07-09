import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { StarknetService } from '../../starknet/starknet.service';

@Injectable()
export class TokenBalanceGuard implements CanActivate {
  constructor(private readonly starknetService: StarknetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!user || !user.walletAddress) {
      throw new ForbiddenException('User wallet address is required for token gating.');
    }

    // Set your required token threshold here
    const REQUIRED_TOKEN_BALANCE = 1;

    // Query StarkNet contract for token balance
    const balance = await this.starknetService.getTokenBalance(user.walletAddress);
    if (balance < REQUIRED_TOKEN_BALANCE) {
      throw new ForbiddenException('Access denied: insufficient token balance to access this content.');
    }
    return true;
  }
}
