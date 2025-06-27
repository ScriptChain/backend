import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class StarknetStrategy extends PassportStrategy(Strategy, 'starknet') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: any) {
    const { address, message, signature } = req.body;
    
    if (!address || !message || !signature) {
      throw new UnauthorizedException('Missing required fields');
    }

    // Verify the signature
    const isSignatureValid = await this.verifyStarknetSignature(
      address,
      message,
      signature,
    );

    if (!isSignatureValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Find or create user
    return this.authService.validateStarknetUser(address);
  }

  private async verifyStarknetSignature(
    address: string,
    message: string,
    signature: string[],
  ): Promise<boolean> {
    try {
      // In a real application, you would verify the signature using the wallet's public key
      // For now, we'll just check that the signature exists and has the expected format
      if (!signature || !Array.isArray(signature) || signature.length === 0) {
        return false;
      }

      // In a production app, you would verify the signature using the wallet's public key
      // This is a simplified example that just checks the signature format
      const isValidSignature = signature.every(
        (s) => typeof s === 'string' && s.startsWith('0x'),
      );

      // For demonstration purposes, we'll just return true if the signature looks valid
      // In a real app, you would verify the signature against the message and address
      return isValidSignature;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }
}
