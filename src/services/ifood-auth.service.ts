import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { IfoodToken } from 'src/entities/ifood-auth.entity';

@Injectable()
export class IfoodAuthService {
  private readonly baseUrl = process.env.IFOOD_AUTH_URL;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(IfoodToken)
    private readonly ifoodAuthTokenRepository: Repository<IfoodToken>,
    private readonly configService: ConfigService,
  ) {}

  async generateUserCode() {
    const clientId = this.configService.get<string>('IFOOD_CLIENT_ID');

    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/userCode`,
      {
        clientId,
      },
    );

    return {
      userCode: data.userCode,
      verificationUrl: data.verificationUrl,
      expiresIn: data.expiresIn,
    };
  }

  async getAccessToken(authorizationCode: string, codeVerifier: string) {
    const clientId = this.configService.get<string>('IFOOD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('IFOOD_CLIENT_SECRET');

    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/token`,
      {
        grantType: 'authorization_code',
        authorizationCode: authorizationCode,
        authorizationCodeVerifier: codeVerifier,
        clientId,
        clientSecret,
      },
    );

    // Atualiza ou cria o token na base de dados
    let authToken = await this.ifoodAuthTokenRepository.findOne({ where: {} });
    if (!authToken) {
      authToken = this.ifoodAuthTokenRepository.create();
    }

    authToken.accessToken = data.accessToken;
    authToken.refreshToken = data.refreshToken;
    authToken.tokenExpiresAt = new Date(Date.now() + data.expiresIn * 1000);

    await this.ifoodAuthTokenRepository.save(authToken);

    return { accessToken: authToken.accessToken, expiresIn: data.expiresIn };
  }

  async refreshToken() {
    const authToken = await this.ifoodAuthTokenRepository.findOne({ where: {} });

    if (!authToken || !authToken.refreshToken) {
      throw new Error('Nenhum token encontrado para renovação.');
    }

    const clientId = this.configService.get<string>('IFOOD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('IFOOD_CLIENT_SECRET');

    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/token`,
      {
        grantType: 'refresh_token',
        refreshToken: authToken.refreshToken,
        clientId,
        clientSecret
      },
    );

    authToken.accessToken = data.accessToken;
    authToken.refreshToken = data.refreshToken;
    authToken.tokenExpiresAt = new Date(Date.now() + data.expiresIn * 1000);

    await this.ifoodAuthTokenRepository.save(authToken);

    return { accessToken: authToken.accessToken };
  }

  async getOrRenewToken() {
    const authToken = await this.ifoodAuthTokenRepository.findOne({ where: {} });
  
    if (!authToken) {
      throw new Error('Nenhum token disponível.');
    }
  
    const now = new Date();
    const expirationTime = new Date(authToken.tokenExpiresAt).getTime();
    const timeRemaining = expirationTime - now.getTime();
  
    // Define o tempo mínimo antes da expiração para renovar o token (10% do tempo total)
    const renewThreshold = (expirationTime - now.getTime()) * 0.1;
  
    console.log(`[SERVICE] Tempo restante para expiração: ${Math.floor(timeRemaining / 1000)}s`);
  
    if (timeRemaining < renewThreshold) {
      console.log('[SERVICE] Token prestes a expirar. Renovando agora...');
      return this.refreshToken();
    }
  
    console.log('[SERVICE] Token ainda válido. Nenhuma ação necessária.');
    return { accessToken: authToken.accessToken };
  }

  async getValidToken() {
    const authToken = await this.ifoodAuthTokenRepository.findOne({ where: {} });
  
    if (!authToken) {
      throw new Error('Nenhum token disponível.');
    }
  
    const now = new Date();
    const expirationTime = new Date(authToken.tokenExpiresAt).getTime();
    const timeRemaining = expirationTime - now.getTime();
  
    if (timeRemaining <= 0) {
      throw new Error('Token expirado. É necessário renová-lo.');
    }
  
    return { accessToken: authToken.accessToken };
  }
  
  
}
