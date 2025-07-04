import { Injectable, Logger } from '@nestjs/common';
// Make sure Provider import is correct for your starknet.js version
import { Provider, Account, Contract, json } from 'starknet';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StarknetService {
  private readonly logger = new Logger(StarknetService.name);
  private contractAddress: string;
  private abi: any;
  private provider: Provider;
  private account: Account;
  private contract: Contract;

  constructor(private configService: ConfigService) {
    this.contractAddress = this.configService.get<string>('STARKNET_CONTRACT_ADDRESS')!;
    const abiPath = this.configService.get<string>('STARKNET_CONTRACT_ABI_PATH')!;
    if (!this.contractAddress || !abiPath) {
      this.logger.error('Missing StarkNet contract address or ABI path in config');
      throw new Error('Missing StarkNet contract address or ABI path in config');
    }
    const abiFullPath = path.resolve(abiPath);
    try {
      const abiJson = fs.readFileSync(abiFullPath, 'utf-8');
      this.abi = json.parse(abiJson);
    } catch (err) {
      this.logger.error(`Failed to load ABI from ${abiFullPath}: ${err.message}`);
      throw err;
    }
    const nodeUrl = this.configService.get<string>('STARKNET_NODE_URL')!;
    this.provider = new Provider({ nodeUrl }); // StarkNet testnet
    // For demonstration, use a dummy private key; in production, use secure secrets management
    const privateKey = this.configService.get<string>('STARKNET_PRIVATE_KEY')!;
    const accountAddress = this.configService.get<string>('STARKNET_ACCOUNT_ADDRESS')!;
    if (!privateKey || !accountAddress) {
      this.logger.error('Missing StarkNet account credentials in config');
      throw new Error('Missing StarkNet account credentials in config');
    }
    this.account = new Account(this.provider, accountAddress, privateKey);
    this.contract = new Contract(this.abi, this.contractAddress, this.account);
  }

  async rewardUser(address: string, amount: string | number) {
    try {
      this.logger.log(`Rewarding address ${address} with amount ${amount}`);
      const tx = await this.contract.invoke('transfer', [address, amount.toString()]);
      this.logger.log(`Reward transaction sent: ${tx.transaction_hash}`);
      return { txHash: tx.transaction_hash };
    } catch (error) {
      this.logger.error(`Error rewarding user: ${error.message}`);
      throw error;
    }
  }

  async getTokenBalance(walletAddress: string): Promise<number> {
    try {
      // Replace 'balanceOf' and argument structure as per your contract's ABI
      const result = await this.contract.call('balanceOf', [walletAddress]);
      // Adjust result parsing as per your contract's return type
      const balance = Array.isArray(result) ? Number(result[0]) : Number(result);
      return balance;
    } catch (error) {
      this.logger.error(`Failed to fetch token balance for ${walletAddress}: ${error.message}`);
      throw new Error('Failed to fetch token balance from StarkNet contract');
    }
  }
}
