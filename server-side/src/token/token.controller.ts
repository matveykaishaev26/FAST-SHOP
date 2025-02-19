import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('temporary-token')
export class TokenController {
  constructor(private readonly temporaryTokenService: TokenService) {}
}
