import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IfoodAuthService } from 'src/services/ifood-auth.service';

@Injectable()
export class TokenRenewalJob {
  constructor(private readonly ifoodAuthService: IfoodAuthService) {}

  @Cron('*/10 * * * *') // Executa a cada 10 minutos
  async renewTokens() {
    console.log('[JOB] Verificando necessidade de renovação do token...');

    try {
      const tokenData = await this.ifoodAuthService.getOrRenewToken();
      console.log(`[JOB] Token válido: ${tokenData.accessToken}`);
    } catch (error) {
      console.error('[JOB] Erro ao garantir token válido:', error.message);
    }
  }
}
