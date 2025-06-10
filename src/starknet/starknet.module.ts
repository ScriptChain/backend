import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StarknetService } from './starknet.service';
import { StarknetController } from './starknet.controller';

@Module({
  imports: [ConfigModule],
  providers: [StarknetService],
  controllers: [StarknetController],
})
export class StarknetModule {}
