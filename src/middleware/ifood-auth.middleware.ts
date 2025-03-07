import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IfoodAuthService } from 'src/services/ifood-auth.service';

@Injectable()
export class IfoodAuthMiddleware implements NestMiddleware {
  constructor(private readonly ifoodAuthService: IfoodAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = await this.ifoodAuthService.getValidToken();
      req.headers.authorization = `Bearer ${accessToken}`;
      next();
    } catch (error) {
      throw new UnauthorizedException('Falha na autenticação com o iFood.');
    }
  }
}
