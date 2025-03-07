import { Controller, Post, Body, Get } from '@nestjs/common';
import { IfoodAuthService } from 'src/services/ifood-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly ifoodAuthService: IfoodAuthService) {}

  @Post('generate-code')
  async generateUserCode() {
    return this.ifoodAuthService.generateUserCode();
  }

  @Post('save-code')
  async getAccessToken(@Body('authorizationCode') authorizationCode: string, @Body('codeVerifier') codeVerifier: string) {
    return this.ifoodAuthService.getAccessToken(authorizationCode, codeVerifier);
  }

  @Get('valid-token')
  async getValidToken() {
    return this.ifoodAuthService.getValidToken();
  }
}
