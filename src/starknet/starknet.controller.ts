import { Controller, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { StarknetService } from './starknet.service';

@Controller('token')
export class StarknetController {
  private readonly logger = new Logger(StarknetController.name);
  constructor(private readonly starknetService: StarknetService) {}

  @Post('reward')
  async reward(@Body('address') address: string, @Body('amount') amount: number) {
    try {
      if (!address || !amount) {
        throw new HttpException('Address and amount are required', HttpStatus.BAD_REQUEST);
      }
      const result = await this.starknetService.rewardUser(address, amount);
      return { success: true, txHash: result.txHash };
    } catch (error) {
      this.logger.error(`Reward error: ${error.message}`);
      throw new HttpException(error.message || 'Reward failed', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
